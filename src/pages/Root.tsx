import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './HomePage';
import { LoginPage } from './LoginPage/LoginPage';
import RegistrationPage from './RegistrationPage';
import { Loader } from '../components/Loader';
import Page from '../components/ChangeLanguage';

const Root = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Page />
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

export default Root;
