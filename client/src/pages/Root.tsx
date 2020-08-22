import React from 'react';
import moment from 'moment';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { LoginPage } from './LoginPage';
import { RegistrationPage } from './RegistrationPage';
import { ForgotPasswordPage } from './ForgotPasswordPage';
import { TestResultsPage } from './TestResultsPage';
import { ChildrenListPage } from './ChildrenListPage';
import { ChildProfile } from './ChildProfile';
import { ParentProfile } from './ParentProfile';
import { UsersPage } from './UsersPage/UsersPage';
import { AdminAgreementsPage } from './AdminAgreementsPage';
import { NewsletterPage } from './Newsletter';
import { AppWrapper } from './AppWrapper/AppWrapper';
import { ParentHomePage } from './HomePage/HomePage';
import { SingleBlogArticle } from './SingleBlogArticlePage';
import { AuthTemplate } from './AuthTemplate/AuthTemplate';
import { BlogMainPage } from './BlogMainPage';
import { NotificationsPage } from './NotificationsPage';
import { ThemeProvider } from '../theme/ThemeProvider';

export const Root = () => {
    const { i18n } = useTranslation();
    moment.updateLocale(i18n.language, {});

    return (
        <ThemeProvider>
            <CssBaseline />
            <Router>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/login" />} />
                    <Route path={['/login']}>
                        <AuthTemplate type="login">
                            <Route path="/login" component={LoginPage} />
                        </AuthTemplate>
                    </Route>
                    <Route path={['/register']} component={RegistrationPage} />
                    <Route path={['/forgot-password']}>
                        <AuthTemplate type="login">
                            <Route path="/forgot-password" component={ForgotPasswordPage} />
                        </AuthTemplate>
                    </Route>
                    <Route path={['/admin', '/parent']}>
                        <AppWrapper>
                            <Route exact path="/parent" component={ParentHomePage} />
                            <Route path="/admin/tests" component={TestResultsPage} />
                            <Route path="/admin/users" component={UsersPage} />
                            <Route path="/parent/child/:childId" component={ChildProfile} />
                            <Route exact path="/admin" />
                            <Route path="/admin/parent/:id" component={ParentProfile} />
                            <Route path="/admin/agreements" component={AdminAgreementsPage} />
                            <Route path="/parent/children" component={ChildrenListPage} />
                            <Route path="/admin/newsletter" component={NewsletterPage} />
                            <Route path="/parent/blog/:category/:page" exact component={BlogMainPage} />
                            <Route path="/parent/article/:articleId" component={SingleBlogArticle} />
                            <Route path="/parent/notifications" component={NotificationsPage} />
                        </AppWrapper>
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
};
