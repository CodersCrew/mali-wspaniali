import { Suspense } from 'react';
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

    return (
        <StylesProvider generateClassName={generateClassName}>
            <ThemeProvider>
                <CssBaseline />
                <Suspense fallback={null}>
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
                            <Route path={['/admin', '/parent', '/instructor']}>
                                <AppWrapper>
                                    <Switch>
                                        <Route
                                            exact
                                            path="/admin"
                                            component={getRootLazyImports('TestResultLoadingPage')}
                                        />
                                        <Route
                                            exact
                                            path="/admin/:assessmentId/:assessmentType"
                                            component={getRootLazyImports('TestResultsPage')}
                                        />
                                        <Route path="/admin/users" component={getRootLazyImports('UsersPage')} />
                                        <Route
                                            path="/admin/parent/:id"
                                            component={getRootLazyImports('ParentProfilePage')}
                                        />
                                        <Route
                                            path="/admin/agreements"
                                            component={getRootLazyImports('AdminAgreementsPageContainer')}
                                        />
                                        <Route
                                            path="/admin/newsletter"
                                            component={getRootLazyImports('NewsletterPage')}
                                        />
                                        <Route path="/admin/archive" component={getRootLazyImports('ArchivePage')} />
                                        <Route
                                            path="/admin/notifications"
                                            component={getRootLazyImports('NotificationsPage')}
                                        />
                                        <Route
                                            path="/admin/test-management/add"
                                            component={getRootLazyImports('AdminManageSingleAssessmentPage')}
                                        />
                                        <Route
                                            path="/admin/test-management/:id/edit"
                                            component={getRootLazyImports('AdminManageSingleAssessmentPage')}
                                        />
                                        <Route
                                            path="/admin/test-management/:id/details"
                                            component={getRootLazyImports('AdminManageSingleAssessmentPage')}
                                        />
                                        <Route
                                            path="/admin/test-management"
                                            component={getRootLazyImports('AdminAssessmentHistoryPage')}
                                        />
                                        <Route
                                            path="/admin/recommendations"
                                            component={getRootLazyImports('AdminRecommendationsPage')}
                                        />
                                        <Route
                                            exact
                                            path="/admin/articles"
                                            component={getRootLazyImports('AdminArticlesPage')}
                                        />
                                        <Route
                                            exact
                                            path="/admin/articles/create"
                                            component={getRootLazyImports('AdminCreateArticlePage')}
                                        />
                                        {/*
                                         TODO: add ArticlePage component for Admin,
                                         currently we display the same component as for Parent
*/}
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
                                                    path="/instructor/settings"
                                                    component={getRootLazyImports('InstructorSettingsPage')}
                                                />
                                                <Route
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
                                                    path="/parent/child/:childId/:category"
                                                    component={getRootLazyImports('ChildResultsPage')}
                                                />
                                                <Route
                                                    path="/parent/blog/:category"
                                                    exact
                                                    component={getRootLazyImports('ArticleListPage')}
                                                />
                                                <Route
                                                    path="/parent/article/:articleId"
                                                    component={getRootLazyImports('ArticlePage')}
                                                />
                                                <Route
                                                    path="/parent/notifications"
                                                    component={getRootLazyImports('NotificationsPage')}
                                                />
                                                <Route
                                                    path="/parent/agreements"
                                                    component={getRootLazyImports('ParentAgreementsPage')}
                                                />
                                                <Route
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
                </Suspense>
            </ThemeProvider>
        </StylesProvider>
    );
}
