import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { RegistrationPage } from './RegistrationPage';
import { ParentProfile } from './ParentProfile';
import { Loader } from '../components/Loader';
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
          <Route path="/admin/parent/:id" component={ParentProfile} />
        </div>
      </Router>
    </>
  );
};
