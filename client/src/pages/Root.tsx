import React from 'react';
import moment from 'moment';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CssBaseline } from '@material-ui/core';
import { AuthTemplate } from './AuthTemplate/AuthTemplate';
import { AppWrapper } from './AppWrapper';
import { ParentWrapper } from './ParentWrapper';
import { LoginPage } from './LoginPage/LoginPage';
import { RegistrationPage } from './RegistrationPage';
import { ForgotPasswordPage } from './ForgotPasswordPage';
import { TestResultsPage } from './TestResultsPage/TestResultsPage';
import { ChildResultsPage } from './ChildProfile/ChildResultsPage';
import { ParentProfilePage } from './ParentProfilePage/ParentProfilePage';
import { UsersPage } from './UsersPage/UsersPage';
import { NewsletterPage } from './NewsletterPage/NewsletterPage';
import { ParentHomePage } from './ParentHomePage/ParentHomePage';
import { ArticlePage } from './ArticlePage/ArticlePage';
import { ArticleListPage } from './ArticleListPage/ArticleListPage';
import { NotificationsPage } from './NotificationsPage/NotificationsPage';
import { AdminHomePage } from './AdminHomePage/AdminHomePage';
import { ParentAgreementsPage } from './ParentAgreementsPage/ParentAgreementsPage';
import { ParentSettingsPage } from './ParentSettingsPage/ParentSettingsPage';
import { CreateArticlePage } from './CreateArticlePage/CreateArticlePage';
import { ArchivePage } from './ArchivePage/ArchivePage';
import { AdminCodesPage } from './AdminCodesPage/AdminCodesPage';
import { AdminInstructorsPage } from './AdminInstructorsPage/AdminInstructorsPage';
import { AdminAgreementsPageContainer } from './AdminAgreementsPage/AdminAgreementsPageConatianer';
import { AddResultsPage } from './AddResultsPage/AddResultsPage';
import { InstructorSettingsPage } from './InstructorSettingsPage/InstructorSettingsPage';
import { AdminAssessmentHistoryPage } from './AdminAssessmentManagementPage/AdminAssessmentHistoryPage';
import { AdminRecommendationsPage } from './AdminRecommendationsPage/AdminRecommendationsPage';
import { AdminSettingsPage } from './AdminSettingsPage/AdminSettingsPage';
import { ThemeProvider } from '../theme/ThemeProvider';
import { AdminManageSingleAssessmentPage } from './AdminAddTestPage/AdminManageSingleAssessmentPage';

export function Root() {
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
                    <Route path={['/admin', '/parent', '/instructor']}>
                        <AppWrapper>
                            <Switch>
                                <Route exact path="/admin" component={AdminHomePage} />
                                <Route path="/admin/tests" component={TestResultsPage} />
                                <Route path="/admin/users" component={UsersPage} />
                                <Route path="/admin/parent/:id" component={ParentProfilePage} />
                                <Route path="/admin/agreements" component={AdminAgreementsPageContainer} />
                                <Route path="/admin/newsletter" component={NewsletterPage} />
                                <Route path="/admin/article/create" component={CreateArticlePage} />
                                <Route path="/admin/archive" component={ArchivePage} />
                                <Route path="/admin/notifications" component={NotificationsPage} />
                                <Route path="/admin/test-management/add" component={AdminManageSingleAssessmentPage} />
                                <Route
                                    path="/admin/test-management/:id/edit"
                                    component={AdminManageSingleAssessmentPage}
                                />
                                <Route
                                    path="/admin/test-management/:id/details"
                                    component={AdminManageSingleAssessmentPage}
                                />
                                <Route path="/admin/test-management" component={AdminAssessmentHistoryPage} />
                                <Route path="/admin/recommendations" component={AdminRecommendationsPage} />
                                <Route path="/admin/keycodes" component={AdminCodesPage} />
                                <Route path="/admin/instructors" component={AdminInstructorsPage} />
                                <Route path="/admin/settings" component={AdminSettingsPage} />
                                <Route exact path="/instructor" component={AddResultsPage} />
                                <Route path="/instructor/settings" component={InstructorSettingsPage} />
                                <ParentWrapper>
                                    <Route exact path="/parent" component={ParentHomePage} />
                                    <Route path="/parent/child/:childId/:category" component={ChildResultsPage} />
                                    <Route path="/parent/blog/:category" exact component={ArticleListPage} />
                                    <Route path="/parent/article/:articleId" component={ArticlePage} />
                                    <Route path="/parent/notifications" component={NotificationsPage} />
                                    <Route path="/parent/agreements" component={ParentAgreementsPage} />
                                    <Route path="/parent/settings" component={ParentSettingsPage} />
                                </ParentWrapper>
                            </Switch>
                        </AppWrapper>
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}
