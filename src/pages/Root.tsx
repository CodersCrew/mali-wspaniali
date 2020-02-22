import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { RegistrationPage } from './RegistrationPage';
import { Loader } from '../components/Loader';
import { ChangeLanguage } from '../components/ChangeLanguage';

export const Root = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ChangeLanguage />
      <Router>
        <div>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegistrationPage} />
        </div>
      </Router>
    </Suspense>
  );
};
