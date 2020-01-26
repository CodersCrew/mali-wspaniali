import React from 'react';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const Root = () => {
  return (
    <Router>
      <div>
        <Route path="/login" component={LoginPage} />
        <Route exact path="/" component={HomePage} />
      </div>
    </Router>
  );
};

export default Root;
