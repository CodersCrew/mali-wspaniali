import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CssBaseline, StylesProvider } from '@material-ui/core';

import { ThemeProvider } from '../theme';
import createGenerateClassName from '../classNameGenerator';
import dayjs from '../localizedMoment';
import { CookieModal } from '../components/CookieModal/CookieModal';

import { ParentWrapper } from './ParentWrapper';
import { AppWrapper } from './AppWrapper';
import { AuthTemplate } from './AuthTemplate/AuthTemplate';
import { getRootLazyImports } from './rootLazyImports';
import { InstructorWrapper } from './InstructorWrapper';

const generateClassName = createGenerateClassName();

export function Root() {
    const { i18n } = useTranslation();

    dayjs.locale(i18n.language);

    React.useEffect(() => {
        getRootLazyImports('RegistrationPage').preload();
        getRootLazyImports('ForgotPasswordPage').preload();
    }, []);

    return (
        <StylesProvider generateClassName={generateClassName}>
            <ThemeProvider>
                <CssBaseline />
                <React.Suspense fallback={null}>
                    <Router>
                        <CookieModal />
                        <Switch>
                            <Route exact path="/" render={() => <Redirect to="/login" />} />
                            <Route path={['/login']}>
                                <AuthTemplate type="login">
                                    <Route exact path="/login/:confirm" component={getRootLazyImports('LoginPage')} />
                                    <Route exact path="/login" component={getRootLazyImports('LoginPage')} />
                                </AuthTemplate>
                            </Route>
                            <Route exact path={['/register']} component={getRootLazyImports('RegistrationPage')} />
                            <Route path={['/forgot-password']}>
                                <AuthTemplate type="login">
                                    <Route
                                        exact
                                        path="/forgot-password"
                                        component={getRootLazyImports('ForgotPasswordPage')}
                                    />
                                </AuthTemplate>
                            </Route>
                            <Route path={['/password-change']}>
                                <AuthTemplate type="login">
                                    <Route
                                        exact
                                        path="/password-change/:confirmation"
                                        component={getRootLazyImports('PasswordChangePage')}
                                    />
                                    <Route
                                        exact
                                        path="/password-change"
                                        component={getRootLazyImports('PasswordChangePage')}
                                    />
                                </AuthTemplate>
                            </Route>
                            <Route exact path="/terms" component={getRootLazyImports('TermsAndConditions')} />
                            <Route path={['/admin', '/parent', '/instructor']}>
                                <AppWrapper>
                                    <Switch>
                                        <Route
                                            exact
                                            path="/admin"
                                            component={getRootLazyImports('TestResultLoadingPage')}
                                        />
                                        <Route exact path="/admin/users" component={getRootLazyImports('UsersPage')} />
                                        <Route
                                            exact
                                            path="/admin/parent/:id"
                                            component={getRootLazyImports('ParentProfilePage')}
                                        />
                                        <Route
                                            exact
                                            path="/admin/agreements"
                                            component={getRootLazyImports('AdminAgreementsPageContainer')}
                                        />
                                        <Route
                                            exact
                                            path="/admin/newsletter"
                                            component={getRootLazyImports('NewsletterPage')}
                                        />
                                        <Route
                                            exact
                                            path="/admin/archive"
                                            component={getRootLazyImports('ArchivePage')}
                                        />
                                        <Route
                                            exact
                                            path="/admin/notifications"
                                            component={getRootLazyImports('NotificationsPage')}
                                        />
                                        <Route
                                            exact
                                            path="/admin/test-management/add"
                                            component={getRootLazyImports('AdminManageSingleAssessmentPage')}
                                        />
                                        <Route
                                            exact
                                            path="/admin/test-management/:id/edit"
                                            component={getRootLazyImports('AdminManageSingleAssessmentPage')}
                                        />
                                        <Route
                                            exact
                                            path="/admin/test-management/:id/details"
                                            component={getRootLazyImports('AdminManageSingleAssessmentPage')}
                                        />
                                        <Route
                                            exact
                                            path="/admin/test-management"
                                            component={getRootLazyImports('AdminAssessmentHistoryPage')}
                                        />
                                        <Route
                                            exact
                                            path="/admin/recommendations"
                                            component={getRootLazyImports('AdminRecommendationsPage')}
                                        />
                                        <Route
                                            exact
                                            path="/admin/article/:articleId/edit"
                                            component={getRootLazyImports('AdminCreateArticlePage')}
                                        />
                                        <Route
                                            exact
                                            path="/admin/articles"
                                            component={getRootLazyImports('AdminArticlesPage')}
                                        />
                                        <Route
                                            exact
                                            path="/admin/article/:articleId"
                                            component={getRootLazyImports('ArticlePage')}
                                        />
                                        <Route
                                            path="/admin/kindergartens"
                                            component={getRootLazyImports('AdminKindergartensPage')}
                                        />
                                        <Route
                                            path="/admin/keycodes"
                                            component={getRootLazyImports('AdminCodesPage')}
                                        />
                                        <Route
                                            path="/admin/instructors"
                                            component={getRootLazyImports('AdminInstructorsPage')}
                                        />
                                        <Route
                                            path="/admin/settings"
                                            component={getRootLazyImports('AdminSettingsPage')}
                                        />
                                        <Route
                                            exact
                                            path="/admin/:assessmentId/:measurementType"
                                            component={getRootLazyImports('TestResultsPage')}
                                        />
                                        <Route path="/instructor">
                                            <InstructorWrapper>
                                                <Route
                                                    exact
                                                    path="/instructor/result/add/:measurement/:assessmentId/:kindergartenId/:childId"
                                                    component={getRootLazyImports('InstructorResultCreatorPage')}
                                                />
                                                <Route
                                                    exact
                                                    path="/instructor"
                                                    component={getRootLazyImports('InstructorAddResultsPage')}
                                                />
                                                <Route
                                                    exact
                                                    path="/instructor/notifications"
                                                    component={getRootLazyImports('NotificationsPage')}
                                                />
                                                <Route
                                                    exact
                                                    path="/instructor/settings"
                                                    component={getRootLazyImports('InstructorSettingsPage')}
                                                />
                                                <Route
                                                    exact
                                                    path="/instructor/results/:resultId"
                                                    component={getRootLazyImports('InstructorResultPage')}
                                                />
                                            </InstructorWrapper>
                                        </Route>
                                        <Route path="/parent">
                                            <ParentWrapper>
                                                <Route
                                                    exact
                                                    path="/parent"
                                                    component={getRootLazyImports('ParentHomePage')}
                                                />
                                                <Route
                                                    exact
                                                    path="/parent/child/:childId/:category"
                                                    component={getRootLazyImports('ChildResultsPage')}
                                                />
                                                <Route
                                                    path="/parent/blog/:category"
                                                    exact
                                                    component={getRootLazyImports('ArticleListPage')}
                                                />
                                                <Route
                                                    exact
                                                    path="/parent/article/:articleId"
                                                    component={getRootLazyImports('ArticlePage')}
                                                />
                                                <Route
                                                    exact
                                                    path="/parent/notifications"
                                                    component={getRootLazyImports('NotificationsPage')}
                                                />
                                                <Route
                                                    exact
                                                    path="/parent/agreements"
                                                    component={getRootLazyImports('ParentAgreementsPage')}
                                                />
                                                <Route
                                                    exact
                                                    path="/parent/settings"
                                                    component={getRootLazyImports('ParentSettingsPage')}
                                                />
                                            </ParentWrapper>
                                        </Route>
                                    </Switch>
                                </AppWrapper>
                            </Route>
                        </Switch>
                    </Router>
                </React.Suspense>
            </ThemeProvider>
        </StylesProvider>
    );
}
