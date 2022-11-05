import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { withRouter } from "react-router";

import { useDispatch } from "react-redux";

import { addItem } from "../redux/shopping-cart/cartItemsSlide";
import { remove } from "../redux/product-modal/productModalSlice";

import Button from "./Button";
import numberWithCommas from "../utils/numberWithCommas";

const ProductView = (props) => {
  const dispatch = useDispatch();

  let product = props.product;

  const [productDetails, setproductDetails] = useState([]);
  const [descriptionExpand, setDescriptionExpand] = useState([]);
  const [images, setImages] = useState([]);
  const [detail, setDetail] = useState({});

  const [quantity, setQuantity] = useState(0);
  const [size, setSize] = useState(0);

  useEffect(() => {
    if (props.product && props.product.images) {
      setImages(props.product.images);
      setproductDetails(props.product.productDetails);
      setDetail(props.product.productDetails[0]);
    }
  }, [props.product]);

  const handelSize = (event) => {
    const index = event.target.value;
    setDetail(props.product.productDetails[index]);
    setSize(props.product.productDetails[index].size.sizeId);
    console.log(size);
  };

  const updateQuantity = (type) => {
    if (type === "plus") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
    return true;
  };

  // const addToCart = () => {
  //   if (check()) {
  //     let newItem = {
  //       slug: product.slug,
  //       color: color,
  //       size: size,
  //       price: product.price,
  //       quantity: quantity,
  //     };
  //     if (dispatch(addItem(newItem))) {
  //       alert("Success");
  //     } else {
  //       alert("Fail");
  //     }
  //   }
  // };

  // const goToCart = () => {
  //     if (check()) {
  //         let newItem = {
  //             slug: product.slug,
  //             color: color,
  //             size: size,
  //             // price: product.price,
  //             quantity: quantity
  //         }
  //         if (dispatch(addItem(newItem))) {
  //             dispatch(remove())
  //             props.history.push('/cart')
  //         } else {
  //             alert('Fail')
  //         }
  //     }
  // }

  return (
    <div className="product">
      <div style={{ marginRight: "20px" }} className="product__images">
        {/*------------------ Hiển thị ảnh */}

        <div className="product__images__list"></div>
        <div className="product__images__main">
          <img src={images && images[0] && images[0].imageUrl} alt="" />
        </div>

        <div
          className={`product-description ${descriptionExpand ? "expand" : ""}`}
        >
          <div className="product-description__title">Chi tiết sản phẩm</div>
          <div
            className="product-description__content"
            dangerouslySetInnerHTML={{ __html: product?.productDescription }}
          ></div>
          <div className="product-description__toggle">
            <Button
              size="sm"
              onClick={() => setDescriptionExpand(!descriptionExpand)}
            >
              {descriptionExpand ? "Thu gọn" : "Xem thêm"}
            </Button>
          </div>
        </div>
      </div>
      <div className="product__info">
        <h1 className="product__info__title">{product?.productName}</h1>
        <div className="product__info__item">
          <span className="product__info__item__price">
            Giá: {detail?.price} VND
          </span>
        </div>

        {/* ------------------select size---------------------- */}

        <div className="product__info__item">
          <div className="product__info__item__title">Kích cỡ</div>

          <select
            className="form-control text-center me-3"
            name="size"
            id="size"
            style={{ maxWidth: "3rem" }}
            onChange={(event) => handelSize(event)}
          >
            {productDetails &&
              productDetails.map((pd, index) => (
                <option key={pd.productDetailId} value={index}>
                  {pd.size.sizeName}
                </option>
              ))}
          </select>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">
            Số lượng: {detail?.stock}
          </div>
          <div className="product__info__item__quantity">
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("minus")}
            >
              <i className="bx bx-minus"></i>
            </div>
            <div className="product__info__item__quantity__input">
              {quantity}
            </div>
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("plus")}
            >
              <i className="bx bx-plus"></i>
            </div>
          </div>
        </div>
        {/* <div className="product__info__item">
          <Button onClick={() => addToCart()}>thêm vào giỏ</Button>
        </div> */}
      </div>
      <div
        className={`product-description mobile ${
          descriptionExpand ? "expand" : ""
        }`}
      >
        <div className="product-description__title">Chi tiết sản phẩm</div>
        <div
          className="product-description__content"
          dangerouslySetInnerHTML={{ __html: product?.productDescription }}
        ></div>
        <div className="product-description__toggle">
          <Button
            size="sm"
            onClick={() => setDescriptionExpand(!descriptionExpand)}
          >
            {descriptionExpand ? "Thu gọn" : "Xem thêm"}
          </Button>
        </div>
      </div>
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object,
};

export default withRouter(ProductView);
