import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { RegistrationPage } from './RegistrationPage';
import { LanguageSelector } from '../components/LanguageSelector';

export const Root = () => {
  return (
    <>
      <LanguageSelector />
      <Router>
        <div>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegistrationPage} />
        </div>
      </Router>
    </>
  );
};
