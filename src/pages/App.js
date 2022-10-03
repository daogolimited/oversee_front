import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, useLocation } from "react-router-dom";
import styled from 'styled-components';

import Header from '../common/Header';

import Home from './User/Home';
import Products from './User/Products';
import Product from './User/Product';
import SignIn from './User/SignIn';
import SignUp from './User/SignUp';

import MLogin from './Manager/MLogin';
import MProductList from './Manager/MProductList';
import MSaleList from './Manager/MSaleList';
import MUserList from './Manager/MUserList';
import SideBar from '../common/manager/SideBar';
import MProductEdit from './Manager/MProductEdit';
import MUserEdit from './Manager/MUserEdit';
import MCategoryList from './Manager/MCategoryList';
import MCategoryEdit from './Manager/MCategoryEdit';

const App = () => {

  return (

    <Router >
      {/* <ScrollToTop/> */}
      <Header />
      {/* <NonLayoutTitle/> */}
      <>

        <Switch>

          {/* user page */}
          <Route exact path="/" component={Home} />
          <Route exact path="/products/:pk" component={Products} />
          <Route exact path="/product/:pk" component={Product} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          {/* manager page */}


          <Route exact path="/manager/login" component={MLogin} />
          <Route exact path="/manager" component={MLogin} />
        </Switch>
        <Switch>
          <Route exact path="/manager/userlist" component={MUserList} />
          <Route exact path="/manager/user/:pk" component={MUserEdit} />
          <Route exact path="/manager/productlist" component={MProductList} />
          <Route exact path="/manager/product/:pk" component={MProductEdit} />
          <Route exact path="/manager/salelist" component={MSaleList} />
          <Route exact path="/manager/categorylist" component={MCategoryList} />
          <Route exact path="/manager/category/:pk" component={MCategoryEdit} />
        </Switch>

      </>
      {/* <Footer/> */}

    </Router>

  );
}


export default App