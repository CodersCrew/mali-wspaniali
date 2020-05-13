import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
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
import { ParentHomePage } from './HomePage';
import { SingleBlogArticle } from './SingleBlogArticle';
import { LoginPageWrapper } from './LoginPageWrapper/LoginPageWrapper';
import { IdleTimer } from '../components/IdleTimer/IdleTimer';
import { BlogMainPage } from './BlogMainPage';

export const Root = () => {
    return (
        <>
            <CssBaseline />
            <Router>
                <Switch>
                    <IdleTimer>
                        <Route path={['/login']}>
                            <LoginPageWrapper>
                                <Route path="/login" component={LoginPage} />
                            </LoginPageWrapper>
                        </Route>
                        <Route path="/register" component={RegistrationPage} />
                            <Route path={['/admin', '/parent']}>
                                <AppWrapper>
                                    <Route path="/parent" component={ParentHomePage} />
                                    <Route path="/admin/tests" component={TestResultsPage} />
                                    <Route path="/admin/users" component={UsersPage} />
                                    <Route path="/parent/child/:childID" component={ChildProfile} />
                                    <Route path="/admin" />
                                    <Route path="/admin/parent/:id" component={ParentProfile} />
                                    <Route path="/admin/agreements" component={AdminAgreementsPage} />
                                    <Route path="/parent/children" component={ChildrenListPage} />
                                    <Route path="/admin/newsletter" component={NewsletterPage} />
                                    <Route path="/parent/article/:articleId" component={SingleBlogArticle} />
                                </AppWrapper>
                            </Route>
                    </IdleTimer>
                </Switch>
            </Router>
        </>
    );
};
