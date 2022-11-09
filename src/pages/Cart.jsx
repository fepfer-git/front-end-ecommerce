import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { CartItemContext } from "../components/Layout";

import Helmet from "../components/Helmet";
import CartItem from "../components/CartItem";
import numberWithCommas from "../utils/numberWithCommas";

import { getProductDetailById } from "../services/ProductDetailService";
import { newOrder } from "../services/OrderService";
import { toast } from "react-toastify";

const Cart = () => {
  // const cartItems = useSelector((state) => state.cartItems.value)

  const [totalProducts, setTotalProducts] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

  const [contact, setcontact] = useState({ orderAddress: "", phone: "" });

  const { cartItems, setCartItems } = useContext(CartItemContext);

  const [cartItemsInfor, setCartItemsInfor] = useState([]);

  useEffect(() => {
    setCartItemsInfor([]);
    setTotalPrice(0);
    console.log(cartItems);
    var price = 0;
    var itemInfor = {
      productDetailId: 0,
      quantity: 0,
      price: 0,
      size: "",
      productName: "",
    };
    cartItems.map((item, index) => {
      getProductDetailById(item?.productDetailId)
        .then((result) => {
          itemInfor = {
            ...itemInfor,
            productDetailId: result.productDetailId,
            quantity: item.quantity,
            price: result.price,
            size: result.size.sizeName,
            productName: result.product.productName,
          };
          console.log(itemInfor);
          setCartItemsInfor((prevState) => [...prevState, itemInfor]);
          price = price + result.price * item.quantity;
          setTotalPrice(price);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [cartItems]);

  const placeOrder = (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (cartItems.length > 0) {
        newOrder(contact, user.user_name, cartItems)
          .then((result) => {
            console.log(result);
            toast.success("Order successfully!");
            setcontact({ orderAddress: "", phone: "" });
            setCartItems([]);
            setCartItemsInfor([]);
            setTotalPrice(0);
          })
          .catch((err) => {
            toast.error(err.response.data.message);
            console.log(err.response.data.message);
          });
      } else {
        toast.error("Nothing in your cart!");
      }
    } else {
      toast.error("You need to login first to place order!");
    }

    console.log("order");
  };

  return (
    <Helmet title="Giỏ hàng">
      <div className="cart">
        <div className="cart__info">
          <div className="cart__info__txt">
            <p>Bạn đang có {cartItemsInfor.length} sản phẩm trong giỏ hàng</p>
            <div className="cart__info__txt__price">
              <span>Thành tiền:</span>{" "}
              <span>{numberWithCommas(Number(totalPrice))}</span>
            </div>
          </div>
          <form onSubmit={(event) => placeOrder(event)}>
            <label>Address</label>
            <input
              name="orderAddress"
              placeholder="VD: Quận 9, TP.HCM"
              required
              onChange={(event) => {
                setcontact({
                  ...contact,
                  [event.target.name]: event.target.value,
                });
              }}
            ></input>
            <label>Phone</label>
            <input
              name="phone"
              placeholder="VD: 123-45-678"
              required
              type="number"
              maxLength="10"
              onChange={(event) => {
                setcontact({
                  ...contact,
                  [event.target.name]: event.target.value,
                });
              }}
            ></input>

            <div className="cart__info__btn">
              <button style={{ marginRight: "5px" }}>Đặt hàng</button>
              <Link to="/catalog">
                <p style={{ fontSize: "20px" }} size="block">
                  Tiếp tục mua hàng
                </p>
              </Link>
            </div>
          </form>
        </div>
        <div style={{ marginTop: "50px" }} className="cart__list">
          {cartItemsInfor.map((item, index) => (
            <CartItem item={item} key={index} />
          ))}
        </div>
      </div>
    </Helmet>
  );
};

export default Cart;
