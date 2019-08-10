import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Login from './pages/Login';
import Main from './pages/Main';

const Routes = () => (
  <BrowserRouter>
    <Route exact path="/" component={Login} />
    <Route path="/dev/:id" component={Main} />
  </BrowserRouter>  
);

export default Routes;