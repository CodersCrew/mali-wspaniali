import lazy from 'react-lazy-with-preload';

const options = {
    LoginPage: lazy(() => import('./LoginPage/LoginPage')),
    RegistrationPage: lazy(() => import('./RegistrationPage/RegistrationPage')),
    ChildResultsPage: lazy(() => import('./ChildProfile/ChildResultsPage')),
    ParentProfilePage: lazy(() => import('./ParentProfilePage/ParentProfilePage')),
    UsersPage: lazy(() => import('./UsersPage/UsersPage')),
    NewsletterPage: lazy(() => import('./NewsletterPage/NewsletterPage')),
    ParentHomePage: lazy(() => import('./ParentHomePage/ParentHomePage')),
    ArticlePage: lazy(() => import('./ArticlePage/ArticlePage')),
    ArticleListPage: lazy(() => import('./ArticleListPage/ArticleListPage')),
    NotificationsPage: lazy(() => import('./NotificationsPage/NotificationsPage')),
    ParentAgreementsPage: lazy(() => import('./ParentAgreementsPage/ParentAgreementsPage')),
    ParentSettingsPage: lazy(() => import('./ParentSettingsPage/ParentSettingsPage')),
    ArchivePage: lazy(() => import('./ArchivePage/ArchivePage')),
    AdminCodesPage: lazy(() => import('./AdminCodesPage/AdminCodesPage')),
    AdminInstructorsPage: lazy(() => import('./AdminInstructorsPage/AdminInstructorsPage')),
    AdminAgreementsPageContainer: lazy(() => import('./AdminAgreementsPage/AdminAgreementsPageConatianer')),
    InstructorAddResultsPage: lazy(() => import('./InstructorAddResultsPage/InstructorAddResultsPage')),
    InstructorResultPage: lazy(() => import('./InstructorResultPage/InstructorResultPage')),
    InstructorSettingsPage: lazy(() => import('./InstructorSettingsPage/InstructorSettingsPage')),
    AdminAssessmentHistoryPage: lazy(() => import('./AdminAssessmentManagementPage/AdminAssessmentHistoryPage')),
    AdminRecommendationsPage: lazy(() => import('./AdminRecommendationsPage/AdminRecommendationsPage')),
    AdminArticlesPage: lazy(() => import('./AdminArticlesPage/AdminArticlesPage')),
    AdminCreateArticlePage: lazy(() => import('./AdminCreateArticlePage/AdminCreateArticlePage')),
    AdminSettingsPage: lazy(() => import('./AdminSettingsPage/AdminSettingsPage')),
    AdminManageSingleAssessmentPage: lazy(() => import('./AdminAddTestPage/AdminManageSingleAssessmentPage')),
    InstructorResultCreatorPage: lazy(() => import('./InstructorResultCreatorPage/InstructorResultCreatorPage')),
    ForgotPasswordPage: lazy(() => import('./ForgotPasswordPage/ForgotPasswordPage')),
    PasswordChangePage: lazy(() => import('./PasswordChangePage/PasswordChangePage')),
    TestResultsPage: lazy(() => import('./TestResultsPage/TestResultsPage')),
    TestResultLoadingPage: lazy(() => import('./TestResultsPage/TestResultLoadingPage')),
    AdminKindergartensPage: lazy(() => import('./AdminKindergartensPage/AdminKindergartensPage')),
};

export function getRootLazyImports(name: keyof typeof options) {
    return options[name];
}
