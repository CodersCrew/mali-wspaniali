import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CssBaseline, StylesProvider } from '@material-ui/core';
import { AuthTemplate } from './AuthTemplate/AuthTemplate';
import { AppWrapper } from './AppWrapper';
import { ParentWrapper } from './ParentWrapper';
import { ThemeProvider } from '../theme/ThemeProvider';
import createGenerateClassName from '../classNameGenerator';
import dayjs from '../localizedMoment';

const LoginPage = React.lazy(() => import('./LoginPage/LoginPage'));
const RegistrationPage = React.lazy(() => import('./RegistrationPage/RegistrationPage'));
const ChildResultsPage = React.lazy(() => import('./ChildProfile/ChildResultsPage'));
const ParentProfilePage = React.lazy(() => import('./ParentProfilePage/ParentProfilePage'));
const UsersPage = React.lazy(() => import('./UsersPage/UsersPage'));
const NewsletterPage = React.lazy(() => import('./NewsletterPage/NewsletterPage'));
const ParentHomePage = React.lazy(() => import('./ParentHomePage/ParentHomePage'));
const ArticlePage = React.lazy(() => import('./ArticlePage/ArticlePage'));
const ArticleListPage = React.lazy(() => import('./ArticleListPage/ArticleListPage'));
const NotificationsPage = React.lazy(() => import('./NotificationsPage/NotificationsPage'));
const AdminHomePage = React.lazy(() => import('./AdminHomePage/AdminHomePage'));
const ParentAgreementsPage = React.lazy(() => import('./ParentAgreementsPage/ParentAgreementsPage'));
const ParentSettingsPage = React.lazy(() => import('./ParentSettingsPage/ParentSettingsPage'));
const ArchivePage = React.lazy(() => import('./ArchivePage/ArchivePage'));
const AdminCodesPage = React.lazy(() => import('./AdminCodesPage/AdminCodesPage'));
const AdminInstructorsPage = React.lazy(() => import('./AdminInstructorsPage/AdminInstructorsPage'));
const AdminAgreementsPageContainer = React.lazy(() => import('./AdminAgreementsPage/AdminAgreementsPageConatianer'));
const InstructorAddResultsPage = React.lazy(() => import('./InstructorAddResultsPage/InstructorAddResultsPage'));
const InstructorSettingsPage = React.lazy(() => import('./InstructorSettingsPage/InstructorSettingsPage'));
const AdminAssessmentHistoryPage = React.lazy(
    () => import('./AdminAssessmentManagementPage/AdminAssessmentHistoryPage'),
);
const AdminRecommendationsPage = React.lazy(() => import('./AdminRecommendationsPage/AdminRecommendationsPage'));
const AdminArticlesPage = React.lazy(() => import('./AdminArticlesPage/AdminArticlesPage'));
const AdminCreateArticlePage = React.lazy(() => import('./AdminCreateArticlePage/AdminCreateArticlePage'));
const AdminSettingsPage = React.lazy(() => import('./AdminSettingsPage/AdminSettingsPage'));
const AdminManageSingleAssessmentPage = React.lazy(() => import('./AdminAddTestPage/AdminManageSingleAssessmentPage'));
const InstructorResultCreatorPage = React.lazy(
    () => import('./InstructorResultCreatorPage/InstructorResultCreatorPage'),
);
const ForgotPasswordPage = React.lazy(() => import('./ForgotPasswordPage/ForgotPasswordPage'));
const TestResultsPage = React.lazy(() => import('./TestResultsPage/TestResultsPage'));
const AdminKindergartensPage = React.lazy(() => import('./AdminKindergartensPage/AdminKindergartensPage'));

const generateClassName = createGenerateClassName();

export function Root() {
    const { i18n } = useTranslation();

    dayjs.locale(i18n.language);

    return (
        <StylesProvider generateClassName={generateClassName}>
            <ThemeProvider>
                <CssBaseline />
                <Suspense fallback={null}>
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
                                        <Route path="/admin/archive" component={ArchivePage} />
                                        <Route path="/admin/notifications" component={NotificationsPage} />
                                        <Route
                                            path="/admin/test-management/add"
                                            component={AdminManageSingleAssessmentPage}
                                        />
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
                                        <Route exact path="/admin/articles" component={AdminArticlesPage} />
                                        <Route exact path="/admin/articles/create" component={AdminCreateArticlePage} />
                                        {/* TODO: add ArticlePage component for Admin, currently we display the same component as for Parent */}
                                        <Route exact path="/admin/article/:articleId" component={ArticlePage} />
                                        <Route path="/admin/kindergartens" component={AdminKindergartensPage} />
                                        <Route path="/admin/keycodes" component={AdminCodesPage} />
                                        <Route path="/admin/instructors" component={AdminInstructorsPage} />
                                        <Route path="/admin/settings" component={AdminSettingsPage} />
                                        <Route
                                            exact
                                            path="/instructor/result/add/:measurement/:assessmentId/:kindergartenId/:childId"
                                            component={InstructorResultCreatorPage}
                                        />
                                        <Route exact path="/instructor" component={InstructorAddResultsPage} />
                                        <Route exact path="/instructor/notifications" component={NotificationsPage} />
                                        <Route path="/instructor/settings" component={InstructorSettingsPage} />
                                        <ParentWrapper>
                                            <Route exact path="/parent" component={ParentHomePage} />
                                            <Route
                                                path="/parent/child/:childId/:category"
                                                component={ChildResultsPage}
                                            />
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
                </Suspense>
            </ThemeProvider>
        </StylesProvider>
    );
}
