import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import App from './App'
import "./styles.css";
import Main from './Main'

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
       <Route exact path="/main" component={Main} />
      </Switch>
    </div>
  </Router>
);

const rootElement = document.getElementById("root");
ReactDOM.render(routing, rootElement);
