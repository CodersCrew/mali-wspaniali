import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";

 export const Root = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegistrationPage} />
      </div>
    </Router>
  );
};

