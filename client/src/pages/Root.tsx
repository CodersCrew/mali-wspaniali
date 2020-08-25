import React from 'react';
import moment from 'moment';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { LoginPage } from './LoginPage/LoginPage';
import { RegistrationPage } from './RegistrationPage';
import { ForgotPasswordPage } from './ForgotPasswordPage';
import { TestResultsPage } from './TestResultsPage';
import { ChildResultsPage } from './ChildProfile/ChildResultsPage';
import { ParentProfilePage } from './ParentProfilePage/ParentProfilePage';
import { UsersPage } from './UsersPage/UsersPage';
import { AdminAgreementsPage } from './AdminAgreementsPage';
import { NewsletterPage } from './NewsletterPage/NewsletterPage';
import { AppWrapper } from './AppWrapper';
import { ParentHomePage } from './ParentHomePage/ParentHomePage';
import { ArticlePage } from './ArticlePage/ArticlePage';
import { AuthTemplate } from './AuthTemplate/AuthTemplate';
import { ArticleListPage } from './ArticleListPage/ArticleListPage';
import { NotificationsPage } from './NotificationsPage';
import { ThemeProvider } from '../theme/ThemeProvider';
import { AdminHomePage } from './AdminHomePage/AdminHomePage';
import { ParentAgreementsPage } from './ParentAgreementsPage/ParentAgreementsPage';
import { ParentSettingsPage } from './ParentSettingsPage/ParentSettingsPage';
import { CreateArticlePage } from './CreateArticlePage/CreateArticlePage';
import { ArchivePage } from './ArchivePage/ArchivePage';
import { TestInformationPage } from './TestInformationPage/TestInformationPage';
import { ChildDetailsPage } from './ChildDetailsPage/ChildDetailsPage';
import { RecomendationsPage } from './RecomendationsPage/RecomendationsPage';
import { AdminSettingsPage } from './AdminSettingsPage/AdminSettingsPage';

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
                            <Route exact path="/admin" component={AdminHomePage} />
                            <Route path="/admin/tests" component={TestResultsPage} />
                            <Route path="/admin/users" component={UsersPage} />
                            <Route path="/admin/parent/:id" component={ParentProfilePage} />
                            <Route path="/admin/agreements" component={AdminAgreementsPage} />
                            <Route path="/admin/newsletter" component={NewsletterPage} />
                            <Route path="/admin/article/create" component={CreateArticlePage} />
                            <Route path="/admin/archive" component={ArchivePage} />
                            <Route path="/admin/notifications" component={NotificationsPage} />
                            <Route path="/admin/settings" component={AdminSettingsPage} />
                            <Route exact path="/parent" component={ParentHomePage} />
                            <Route path="/parent/child/:childId/results" component={ChildResultsPage} />
                            <Route path="/parent/child/:childId/tests-information" component={TestInformationPage} />
                            <Route path="/parent/child/:childId/details" component={ChildDetailsPage} />
                            <Route path="/parent/child/:childId/recomendations" component={RecomendationsPage} />
                            <Route path="/parent/blog/:category/:page" exact component={ArticleListPage} />
                            <Route path="/parent/article/:articleId" component={ArticlePage} />
                            <Route path="/parent/notifications" component={NotificationsPage} />
                            <Route path="/parent/agreements" component={ParentAgreementsPage} />
                            <Route path="/parent/settings" component={ParentSettingsPage} />
                        </AppWrapper>
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
};
