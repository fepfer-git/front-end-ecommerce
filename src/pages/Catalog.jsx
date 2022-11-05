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
  }, []);

  const [filterSelected, setFilterSelected] = useState();

  const [categories, setCategories] = useState([]);

  const [products, setProducts] = useState([]);

  const filterSelect = (categoryId) => {
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
    var ele = document.getElementsByName("categoryRadio");
    for (var i = 0; i < ele.length; i++) ele[i].checked = false;
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

            {/* Filter category */}
            <div className="catalog__filter__widget__content">
              {categories?.map((item, index) => (
                <div
                  key={item.categoryId}
                  className="catalog__filter__widget__content__item"
                >
                  <label
                    style={{ color: "#283618", fontWeight: "bold" }}
                    className="custom-checkbox"
                  >
                    <input
                      name="categoryRadio"
                      id={item.categoryId}
                      type="radio"
                    />

                    <span className="custom-checkbox__checkmark">
                      <i className="bx bx-check"></i>
                    </span>
                    {item?.categoryName}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__content">
              <Button size="sm" onClick={clearFilter}>
                xóa bộ lọc
              </Button>
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
