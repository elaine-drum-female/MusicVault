import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Wrapper from './hoc/wrapper';
import Authorize from './hoc/auth';

import Home from './components/Home';
import RegisterLogin from './components/Register_login';
import Register from './components/Register_login/register';
import Shop from './components/Shop';
import ProductPage from './components/Product';

import UserDashboard from './components/PrivateDashboard';
import AddProduct from './components/PrivateDashboard/Admin/add_product';
import ManageCategories from './components/PrivateDashboard/Admin/manage_categories';
import UserCart from './components/PrivateDashboard/cart';
import UpdateProfile from './components/PrivateDashboard/update_profile';

const App = () => {
  return (
    <Wrapper>
      <Switch>
        <Route exact path="/user/dashboard" component={Authorize(UserDashboard, true)} />
        <Route exact path="/user/shopping-cart" component={Authorize(UserCart, true)} />
        <Route exact path="/admin/add_product" component={Authorize(AddProduct, true)} />
        <Route exact path="/admin/manage_categories" component={Authorize(ManageCategories, true)} />
        <Route exact path="/user/user_profile" component={Authorize(UpdateProfile, true)} />

        <Route exact path="/product_detail/:id" component={Authorize(ProductPage, null)} />
        <Route exact path="/register" component={Authorize(Register, false)} />
        <Route exact path="/register_login" component={Authorize(RegisterLogin, false)} />

        <Route exact path="/" component={Authorize(Home , null)} />
        <Route exact path="/shop" component={Authorize(Shop , null)} />
      </Switch>
    </Wrapper>
  );
};

export default App;