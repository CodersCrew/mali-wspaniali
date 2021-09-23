export type ArticleCategory = 'food' | 'activity' | 'emotions' | 'other';

export interface Article {
    _id: string;
    pictureUrl: string;
    title: string;
    contentHTML: string;
    category: ArticleCategory;
    description: string;
    videoUrl: string;
    redactor: Redactor;
    isDeleted: boolean;
    isPublished: boolean;
    createdAt: string;
    deletedAt: string;
    modifiedAt: string;
    publishedAt: string;
}

export interface Redactor {
    avatarUrl: string;
    firstName: string;
    lastName: string;
    profession: string;
    biography: string;
}

export interface PaginatedArticles {
    articles: Article[];
    hasNext: boolean;
    count: number;
}

export interface ReturnedStatus {
    status: boolean;
}

export interface ReturnedToken {
    login: {
        token: string;
    };
}

export interface UserInput {
    mail: string;
    password: string;
    keyCode: string;
    agreements: string[];
}

export type Role = 'parent' | 'admin' | 'instructor';

export interface ChildInput {
    firstname: string;
    lastname: string;
    birthYear: number;
    birthQuarter: number;
    sex: string;
    kindergartenId: string;
}

export interface UpdatedChildInput {
    childId: string;
    firstname: string;
    lastname: string;
    birthYear: number;
    birthQuarter: number;
    sex: string;
    kindergartenId: string;
}

export interface AddChildResult {
    firstname: string;
    lastname: string;
    sex: string;
    'birth-date': string;
    'birth-quarter': string;
    kindergarten: string;
}

export interface UpdatedUserInput {
    firstname: string;
    lastname: string;
}

export type UpdateInstructorNameResult = UpdatedUserInput;

export type User = Omit<Me, 'notifications'>;

export type PrivilegedUser = Omit<User, 'children' | 'agreements'>;

export interface Me {
    _id: string;
    mail: string;
    firstname: string;
    lastname: string;
    date: string;
    role: Role;
    children: Child[];
    agreements: Agreement[];
    notifications: Notification[];
}

export interface AssessmentParam {
    a: number;
    b: number;
    lowerLimit: number;
    lowerLimitPoints: number;
    upperLimit: number;
    upperLimitPoints: number;
    badStageLimit: number;
    weakStageLimit: number;
    middleStageLimit: number;
    goodStageLimit: number;
    veryGoodStageLimit: number;
    minScale: number;
    scale39: number;
    scale49: number;
    scale59: number;
    maxScale: number;
}

export interface BaseChildInfo {
    _id: string;
    firstname: string;
    lastname: string;
    sex: Sex;
    age?: number;
}

export interface Child extends BaseChildInfo {
    kindergarten: Kindergarten;
    birthYear: number;
    birthQuarter: number;
    age?: number;
    results: AssessmentResult[];
    createdAt: string;
    currentParams?: {
        run?: AssessmentParam;
        pendelumRun?: AssessmentParam;
        throw?: AssessmentParam;
        jump?: AssessmentParam;
    };
}

export type Sex = 'male' | 'female';

export interface KindergartenWithChildren {
    kindergarten: {
        _id: string;
        name: string;
        address: string;
        firstMeasurementResultCount: number;
        lastMeasurementResultCount: number;
        maxResultCount: number;
        children: BaseChildInfo[];
    };
}

export interface Kindergarten {
    _id: string;
    name: string;
    number: number;
    address: string;
    city: string;
    children?: Child[];
}

export interface AddKindergartenInput {
    name: string;
    number: number;
    address: string;
    city: string;
}

export interface KindergartenWithUsers {
    _id: string;
    name: string;
    number: number;
    address: string;
    city: string;
    users: User[];
}

export interface TestResult {
    _id: string;
    rootResultId: string | null;
    date: string;
    test: {
        testPeriod: 'START' | 'END';
        childAge: number;
        agilityPoints: number;
        agilitySeconds: number;
        powerCentimeters: number;
        powerPoints: number;
        schoolYearStart: number;
        speedPoints: number;
        speedSeconds: number;
        strengthCentimeters: number;
        strengthPoints: number;
    };
}

export interface Agreement {
    _id: string;
    date: string;
    isSigned: boolean;
    text: string;
}

export interface Notification {
    _id: string;
    createdAt: string;
    values: string[];
    templateId: string;
    isRead: boolean;
}

export interface KeyCode {
    id: string;
    createdAt: string;
    createdBy: string;
    keyCode: string;
    series: string;
    target: string;
}

export interface KeyCodeSeries {
    createdAt: string;
    series: string;
    target: string;
    count: number;
}

export interface Assessment {
    _id: string;
    isOutdated: boolean;
    isDeleted: boolean;
    title: string;
    firstMeasurementStatus: string;
    lastMeasurementStatus: string;
    firstMeasurementStartDate: string;
    firstMeasurementEndDate: string;
    lastMeasurementStartDate: string;
    lastMeasurementEndDate: string;
    firstMeasurementResultCount: number;
    lastMeasurementResultCount: number;
    maxResultCount: number;
    kindergartens: {
        instructor: User | null;
        kindergarten: Kindergarten | null;
    }[];
    groups: { kindergartenId: string; group: string }[];
}

export interface AssessmentResult {
    _id: string;
    childId: string;
    kindergartenId: string;
    assessmentId: string;
    assessment: Assessment;
    currentParams: {
        run?: AssessmentParam;
        pendelumRun?: AssessmentParam;
        throw?: AssessmentParam;
        jump?: AssessmentParam;
    };
    child: Child;
    firstMeasurementNote: string;
    lastMeasurementNote: string;
    firstMeasurementRunResult: number;
    lastMeasurementRunResult: number;
    firstMeasurementPendelumRunResult: number;
    lastMeasurementPendelumRunResult: number;
    firstMeasurementThrowResult: number;
    lastMeasurementThrowResult: number;
    firstMeasurementJumpResult: number;
    lastMeasurementJumpResult: number;
    firstMeasurementRunDate: Date;
    lastMeasurementRunDate: Date;
    firstMeasurementPendelumRunDate: Date;
    lastMeasurementPendelumRunDate: Date;
    firstMeasurementThrowDate: Date;
    lastMeasurementThrowDate: Date;
    firstMeasurementJumpDate: Date;
    lastMeasurementJumpDate: Date;
    createdAt: Date;
    modifiedAt: Date;
    firstMeasurementGroup?: string;
    lastMeasurementGroup?: string;
}

export interface ReturnedStatusDTO {
    status: boolean;
}

export interface Group {
    kindergartenId: string;
    group: string;
}

export interface NewsletterInput {
    message: string;
    recipients: string[];
    title: string;
    type: string;
}
