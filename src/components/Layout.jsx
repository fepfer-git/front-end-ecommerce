import React from "react";

import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import ProductViewModal from "./ProductViewModal";

import Routes from "../routes/Routes";

const Layout = () => {
  const [searchedValue, setSearchedValue] = React.useState();
  return (
    <BrowserRouter>
      <Route
        render={() => (
          <div>
            <Header setSearch={setSearchedValue} />
            <div className="container">
              <div className="main">
                <Routes />
              </div>
            </div>
            <Footer />
            <ProductViewModal />
          </div>
        )}
      />
    </BrowserRouter>
  );
};

export default Layout;
