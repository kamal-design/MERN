import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";

import './index.css';
import App from './App';
import User from './User';
import Visit from './Visit';
import reportWebVitals from './reportWebVitals';
import notfount from './notfount';

const routing = (
  <Router>
    <div> 
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/user">User</Link></li>
        <li><Link to="/visit">Visit</Link></li>
      </ul>
    </div>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/user" component={User} />
      <Route exact path="/visit" component={Visit} />
      <Route component={notfount} />
    </Switch>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
