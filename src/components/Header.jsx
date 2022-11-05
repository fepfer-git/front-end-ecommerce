import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { searchPorudctByName } from "../services/ProductService";

import logo from "../assets/images/gucci-gang.png";
import { toast } from "react-toastify";

const mainNav = [
  {
    display: "Trang chủ",
    path: "/",
  },
  {
    display: "Sản phẩm",
    path: "/catalog",
  },
];

const Header = ({ setSearchedValue }) => {
  const [searchKeyword, setSearchKeyWord] = useState("");
  const { pathname } = useLocation();
  const activeNav = mainNav.findIndex((e) => e.path === pathname);
  const headerRef = useRef(null);
  // const [login, setLogin] = useState("/");

  // const logOutHandeler = () => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (user) {
  //     var expiration = Number(user.expiration);
  //     var today = Math.round(new Date().getTime());
  //     if (today < expiration) {
  //       setLogin("/login");
  //     } else {
  //       setLogin("/");
  //     }
  //   } else {
  //     setLogin("/");
  //   }
  // };

  const menuLeft = useRef(null);

  const menuToggle = () => menuLeft.current.classList.toggle("active");

  const searchProduct = (event) => {
    event.preventDefault();
    searchPorudctByName(searchKeyword)
      .then((result) => {
        if (result) {
          console.log(result);
          setSearchedValue(result);
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        console.log(err);
      });
  };

  return (
    <div className="header" ref={headerRef}>
      <div className="container">
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="header__menu">
          <div className="header__menu__mobile-toggle" onClick={menuToggle}>
            <i className="bx bx-menu-alt-left"></i>
          </div>
          <div className="header__menu__left" ref={menuLeft}>
            <div className="header__menu__left__close" onClick={menuToggle}>
              <i className="bx bx-chevron-left"></i>
            </div>
            {mainNav.map((item, index) => (
              <div
                key={index}
                className={`header__menu__item header__menu__left__item ${
                  index === activeNav ? "active" : ""
                }`}
                onClick={menuToggle}
              >
                <Link to={item.path}>
                  <span>{item.display}</span>
                </Link>
              </div>
            ))}
          </div>
          <div className="header__menu__right">
            <div className="header__menu__item header__menu__right__item">
              <form onSubmit={(event) => searchProduct(event)}>
                <input
                  onChange={(event) => {
                    setSearchKeyWord(event.target.value);
                  }}
                  type="text"
                  placeholder="Search.."
                  name="search"
                />
              </form>
            </div>
            <div className="header__menu__item header__menu__right__item">
              <Link to="/cart">
                <i className="bx bx-shopping-bag"></i>
              </Link>
            </div>
            <div
              // onClick={() => logOutHandeler()}
              className="header__menu__item header__menu__right__item"
            >
              <Link to="/login">
                <i className="bx bx-user"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
