import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { RegistrationPage } from './RegistrationPage';
import { TestResultsPage } from './TestResultsPage';
import { ChildProfile } from './ChildProfile';
import { ParentProfile } from './ParentProfile';
import { LanguageSelector } from '../components/LanguageSelector';
import { UsersPage } from './UsersPage';

export const Root = () => {
  return (
    <>
      <LanguageSelector />
      <Router>
        <div>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegistrationPage} />
          <Route path="/admin/tests" component={TestResultsPage} />
          <Route path="/admin/users" component={UsersPage} />
          <Route path="/child/:childID" component={ChildProfile} />
          <Route path="/admin" />
          <Route path="/admin/parent/:id" component={ParentProfile} />
          <Route path="/parent" />
        </div>
      </Router>
    </>
  );
};
