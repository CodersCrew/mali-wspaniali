import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { RegistrationPage } from './RegistrationPage';
import { ChildProfile } from './ChildProfile';
import { ParentProfile } from './ParentProfile';
import { LanguageSelector } from '../components/LanguageSelector';
import { AuthAwareRoutes } from './authAwareRoutes';

export const Root = () => {
  return (
    <>
      <LanguageSelector />
      <Router>
        <AuthAwareRoutes>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegistrationPage} />
          <Route path="/child/:childID" component={ChildProfile} />
          <Route path="/admin/parent/:id" component={ParentProfile} />
        </AuthAwareRoutes>
      </Router>
    </>
  );
};
