import React, { useContext, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CartItemContext } from "../components/Layout";

import Helmet from "../components/Helmet";
import CartItem from "../components/CartItem";
import Button from "../components/Button";

import numberWithCommas from "../utils/numberWithCommas";

import { getProductDetailById } from "../services/ProductDetailService";

const Cart = () => {
  // const cartItems = useSelector((state) => state.cartItems.value)

  const [totalProducts, setTotalProducts] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

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
          <div className="cart__info__btn">
            <Button size="block">Đặt hàng</Button>
            <Link to="/catalog">
              <Button size="block">Tiếp tục mua hàng</Button>
            </Link>
          </div>
        </div>
        <div className="cart__list">
          {cartItemsInfor.map((item, index) => (
            <CartItem item={item} key={index} />
          ))}
        </div>
      </div>
    </Helmet>
  );
};

export default Cart;
