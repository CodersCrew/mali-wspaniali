import React from "react";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Root = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
      </div>
    </Router>
  );
};

export default Root;
