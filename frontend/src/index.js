import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import LoginPage from "views/Login/App.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path='/' exact component={props => <Redirect to='/login'{...props}/>}/>
      <Route  path="/admin" component={props => <Admin {...props}/>} />
      <Route exact path="/login" component={props => <LoginPage {...props}/>}/>
    </Switch>
  </Router>,
  document.getElementById("root")
);
