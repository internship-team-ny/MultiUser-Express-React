// src/routes.js
import React from 'react';
import { Router, Route } from 'react-router';

import Login from './components/Login';
import Hashtag from './components/Hashtag';
import About from './components/About';
import NotFound from './components/NotFound';

import Test from './components/Test';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={Login} />
    <Route path="/hashtag" component={Hashtag} />
    <Route path="/about" component={About} />
    <Route path="/test" component={Test} />
    <Route path="*" component={NotFound} />
  </Router>
);

export default Routes;
