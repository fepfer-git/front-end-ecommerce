import React, { createContext } from "react";

import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import ProductViewModal from "./ProductViewModal";

import Routes from "../routes/Routes";
export const SearchContext = createContext();

const Layout = () => {
  const [searchedValue, setSearchedValue] = React.useState();
  console.log(searchedValue);
  return (
    <BrowserRouter>
      <Route
        render={() => (
          <div>
            <Header setSearchedValue={setSearchedValue} />
            <div className="container">
              <div className="main">
                <SearchContext.Provider value={searchedValue}>
                  <Routes />
                </SearchContext.Provider>
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
