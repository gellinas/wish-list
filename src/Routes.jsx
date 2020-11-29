import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome.jsx";
import CreateAccount from "./CreateAccount/CreateAccount.jsx";
import Login from "./Login/Login.jsx";
import UserWishlist from "./UserWishlist/UserWishlist.jsx";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Welcome} exact />
        <Route path="/createaccount" component={CreateAccount} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/mywishlist" component={UserWishlist} exact />
      </Switch>
    </Router>
  );
}

export default Routes;
