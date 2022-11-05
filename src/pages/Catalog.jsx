import React, { useState, useEffect, useRef } from "react";
import Helmet from "../components/Helmet";
import {
  getAllProduct,
  getAllProductByCategory,
} from "../services/ProductService";
import Button from "../components/Button";
import InfinityList from "../components/InfinityList";
import { getAllCategories } from "../services/CategoryService";

const Catalog = () => {
  const initFilter = {
    category: [],
    color: [],
    size: [],
  };

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [clearFilterCate, setClearFilterCate] = useState("");

  useEffect(() => {
    getAllProduct()
      .then((result) => {
        setProducts(result);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });

    getAllCategories()
      .then((result) => {
        setCategories(result);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [clearFilterCate]);

  const filterSelect = (event) => {
    const categoryId = event.target.value;
    console.log(categoryId);
    getAllProductByCategory(categoryId)
      .then((result) => {
        setProducts(result);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clearFilter = () => {
    var dropDown = document.getElementById("categorySelect");
    dropDown.selectedIndex = 0;
    setClearFilterCate(Math.random());
  };

  const filterRef = useRef(null);

  const showHideFilter = () => filterRef.current.classList.toggle("active");

  return (
    <Helmet title="Sản phẩm">
      <div className="catalog">
        <div className="catalog__filter" ref={filterRef}>
          <div
            className="catalog__filter__close"
            onClick={() => showHideFilter()}
          >
            <i className="bx bx-left-arrow-alt"></i>
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">
              danh mục sản phẩm
            </div>
            <div
              style={{ marginTop: "-40px" }}
              className="catalog__filter__widget"
            >
              <div className="catalog__filter__widget__content">
                <Button size="sm" onClick={clearFilter}>
                  xóa bộ lọc
                </Button>
              </div>
            </div>
            {/* Filter category */}
            <div className="catalog__filter__widget__content">
              <select
                id="categorySelect"
                style={{
                  width: "150px",
                  height: "30px",
                  color: "black",
                  fontWeight: "Bold",
                }}
                onChange={(event) => filterSelect(event)}
              >
                <option value="" selected disabled hidden>
                  Category
                </option>
                {categories?.map((item, index) => (
                  <option
                    value={item.categoryId}
                    key={item.categoryId}
                    style={{
                      color: "black",
                      fontWeight: "Bold",
                    }}
                  >
                    {item.categoryName}
                  </option>

                  // <div
                  //   key={item.categoryId}
                  //   className="catalog__filter__widget__content__item"
                  // >
                  //   <label
                  //     style={{ color: "#283618", fontWeight: "bold" }}
                  //     className="custom-checkbox"
                  //   >
                  //     <input
                  //       name="categoryRadio"
                  //       id={item.categoryId}
                  //       type="radio"
                  //     />

                  //     <span className="custom-checkbox__checkmark">
                  //       <i className="bx bx-check"></i>
                  //     </span>
                  //     {item?.categoryName}
                  //   </label>
                  // </div>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="catalog__filter__toggle">
          <Button size="sm" onClick={() => showHideFilter()}>
            bộ lọc
          </Button>
        </div>

        {/* danh sach product */}
        {/* truyen list product o day */}

        <div className="catalog__content">
          <InfinityList data={products} />
        </div>
      </div>
    </Helmet>
  );
};

export default Catalog;
