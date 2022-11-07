import React, { useRef, useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { searchPorudctByName } from "../services/ProductService";

import logo from "../assets/images/gucci-gang.png";
import { toast } from "react-toastify";

const Header = ({ setSearchedValue, checkLogin }) => {
  const [logged, setLogged] = useState({});

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
  const [searchKeyword, setSearchKeyWord] = useState("");
  const { pathname } = useLocation();
  const activeNav = mainNav.findIndex((e) => e.path === pathname);
  const headerRef = useRef(null);
  const menuLeft = useRef(null);
  const history = useHistory();

  const menuToggle = () => menuLeft.current.classList.toggle("active");

  const logOutHandler = () => {
    localStorage.removeItem("user");
    setLogged({});
    history.push("/login");
  };

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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setLogged(user);
    if (user && user.user_role === "ADMIN") {
    }
  }, [checkLogin]);

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

            {!(logged && logged?.user_role === "ADMIN") &&
              mainNav.map((item, index) => (
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
            {!(logged && logged?.user_role === "ADMIN") && (
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
            )}

            {!(logged && logged?.user_role === "ADMIN") && (
              <div className="header__menu__item header__menu__right__item">
                <Link to="/cart">
                  <i className="bx bx-shopping-bag"></i>
                </Link>
              </div>
            )}

            {!logged?.user_name ? (
              <div className="header__menu__item header__menu__right__item">
                <Link to="/login">
                  <i className="bx bx-user"></i>
                </Link>
              </div>
            ) : (
              <div
                onClick={() => logOutHandler()}
                style={{ fontSize: "20px" }}
                className="header__menu__item header__menu__right__item"
              >
                Log out
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
