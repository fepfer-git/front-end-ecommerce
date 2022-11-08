import React, { useEffect } from "react";

import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Cart from "../pages/Cart";
import Product from "../pages/Product";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminCatalog from "../pages/AdminCatalog";
import SizeManagement from "../pages/SizeManagement";
import CategoryManagement from "../pages/CategoryManagement";
import UserManagement from "../pages/UserManagement";
import NotFoundPage from "../pages/NotFoundPage";
import UserProfile from "../pages/UserProfile";
const Routes = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/catalog/:slug" component={Product} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/cart" component={Cart} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route
        path="/admin"
        component={user?.user_role === "ADMIN" ? AdminCatalog : NotFoundPage}
      />
      <Route
        path="/size"
        component={user?.user_role === "ADMIN" ? SizeManagement : NotFoundPage}
      />
      <Route
        path="/category"
        component={
          user?.user_role === "ADMIN" ? CategoryManagement : NotFoundPage
        }
      />
      <Route
        path="/manageUser"
        component={user?.user_role === "ADMIN" ? UserManagement : NotFoundPage}
      />
      <Route
        path="/profile"
        component={user?.user_role === "USER" ? UserProfile : NotFoundPage}
      />
    </Switch>
  );
};

export default Routes;
