import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { updateItem, removeItem } from "../redux/shopping-cart/cartItemsSlide";
import { CartItemContext } from "../components/Layout";

import numberWithCommas from "../utils/numberWithCommas";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { toast } from "react-toastify";

const CartItem = (props) => {
  const { cartItems, setCartItems } = useContext(CartItemContext);

  const dispatch = useDispatch();

  const itemRef = useRef(null);

  const [item, setItem] = useState(props.item);
  const [quantity, setQuantity] = useState(props.item.quantity);

  useEffect(() => {
    setItem(props.item);
    setQuantity(props.item.quantity);
  }, [props.item]);

  const updateQuantity = (opt) => {
    if (opt === "+") {
      setCartItems((prevState) => [
        ...prevState.map((cartItem) =>
          cartItem.productDetailId === item.productDetailId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ),
      ]);
    }
    if (opt === "-") {
      if (item.quantity === 1) {
        setCartItems(
          cartItems.filter(
            (removeItem) => removeItem.productDetailId !== item.productDetailId
          )
        );
      } else {
        setCartItems((prevState) => [
          ...prevState.map((cartItem) =>
            cartItem.productDetailId === item.productDetailId
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          ),
        ]);
      }
    }
  };

  //   const updateCartItem = () => {
  //     dispatch(updateItem({ ...item, quantity: quantity }));
  //   };

  const removeCartItem = () => {
    console.log("removeCartItem");
    console.log(
      cartItems.filter(
        (removeItem) => removeItem.productDetailId !== item.productDetailId
      )
    );
    setCartItems(
      cartItems.filter(
        (removeItem) => removeItem.productDetailId !== item.productDetailId
      )
    );
  };

  return (
    <div className="cart__item" ref={itemRef}>
      <div className="cart__item__image">
        <img src="" alt="" />
      </div>
      <div className="cart__item__info">
        <div className="cart__item__info__name">{item.productName}</div>
        <div className="cart__item__info__quantity">{item.size}</div>
        <div className="cart__item__info__price">
          {numberWithCommas(item.price)}
        </div>
        <div className="cart__item__info__quantity">
          <div className="product__info__item__quantity">
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("-")}
            >
              <i className="bx bx-minus"></i>
            </div>
            <div className="product__info__item__quantity__input">
              {quantity}
            </div>
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("+")}
            >
              <i className="bx bx-plus"></i>
            </div>
          </div>
        </div>
        <div className="cart__item__del">
          <i className="bx bx-trash" onClick={() => removeCartItem()}></i>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
};

export default CartItem;
