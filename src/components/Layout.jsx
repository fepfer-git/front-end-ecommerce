import React, { createContext } from "react";

import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import ProductViewModal from "./ProductViewModal";

import Routes from "../routes/Routes";
import { useState } from "react";
const SearchContext = createContext();
const LoginContext = createContext();

const Layout = () => {
  const [searchedValue, setSearchedValue] = useState();
  const [checkLogin, setCheckLogin] = useState({
    userName: "",
    userRole: "",
    expiration: 0,
  });
  const loginContextValue = { checkLogin, setCheckLogin };
  console.log(searchedValue);
  return (
    <BrowserRouter>
      <Route
        render={() => (
          <div>
            <LoginContext.Provider value={loginContextValue}>
              <Header
                setSearchedValue={setSearchedValue}
                checkLogin={checkLogin}
              />
              <div className="container">
                <div className="main">
                  <SearchContext.Provider value={searchedValue}>
                    <Routes />
                  </SearchContext.Provider>
                </div>
              </div>
              <Footer />
              <ProductViewModal />
            </LoginContext.Provider>
          </div>
        )}
      />
    </BrowserRouter>
  );
};

export { Layout, SearchContext, LoginContext };
