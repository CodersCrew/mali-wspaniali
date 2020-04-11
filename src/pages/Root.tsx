import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { RegistrationPage } from './RegistrationPage';
import { TestResultsPage } from './TestResultsPage';
import { ChildrenListPage } from './ChildrenListPage';
import { ChildProfile } from './ChildProfile';
import { ParentProfile } from './ParentProfile';
import { UsersPage } from './UsersPage';
import { AdminAgreementsPage } from './AdminAgreementsPage';
import { NewsletterPage } from './Newsletter';
import { AppWrapper } from './AppWrapper/AppWrapper';
import { LoginPageWrapper } from './LoginPageWrapper/LoginPageWrapper';

export const Root = () => {
    return (
        <>
            <CssBaseline />
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <LoginPageWrapper>
                        <Route path="/login" component={LoginPage} />
                    </LoginPageWrapper>
                    <Route path="/register" component={RegistrationPage} />
                    <AppWrapper>
                        <Route path="/admin/tests" component={TestResultsPage} />
                        <Route path="/admin/users" component={UsersPage} />
                        <Route path="/child/:childID" component={ChildProfile} />
                        <Route path="/admin" />
                        <Route path="/admin/parent/:id" component={ParentProfile} />
                        <Route path="/parent" />
                        <Route path="/admin/agreements" component={AdminAgreementsPage} />
                        <Route path="/parent/children" component={ChildrenListPage} />
                        <Route path="/admin/newsletter" component={NewsletterPage} />
                    </AppWrapper>
                </Switch>
            </Router>
        </>
    );
};
