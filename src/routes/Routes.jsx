import React from "react";

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
const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/catalog/:slug" component={Product} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/cart" component={Cart} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/admin" component={AdminCatalog} />
      <Route path="/size" component={SizeManagement} />
      <Route path="/category" component={CategoryManagement} />
      <Route path="/manageUser" component={UserManagement} />
    </Switch>
  );
};

export default Routes;
