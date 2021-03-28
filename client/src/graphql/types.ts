export type ArticleCategory = 'food' | 'activity' | 'emotions' | 'other';

export interface Article {
    _id: string;
    pictureUrl: string;
    title: string;
    contentHTML: string;
    tags: string[];
    category: ArticleCategory;
    description: string;
    videoUrl: string;
    redactor: Redactor;
    date: string;
}

export interface ArticleInput {
    category: string;
    contentHTML: string;
    description: string;
    header: string;
    pictureUrl: string;
    readingTime: number;
    redactor: Redactor;
    subtitle: string;
    tags: string[];
    title: string;
    videoUrl: string;
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

export type User = Omit<Me, 'notifications'>;

export type PrivilegedUser = Omit<User, 'children' | 'agreements'>;

export interface Me {
    _id: string;
    mail: string;
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
}

export interface Child {
    _id: string;
    firstname: string;
    lastname: string;
    sex: Sex;
    kindergarten: Kindergarten;
    birthYear: number;
    birthQuarter: number;
    results: TestResult[];
    currentParams?: {
        run?: AssessmentParam;
        pendelumRun?: AssessmentParam;
        throw?: AssessmentParam;
        jump?: AssessmentParam;
    };
}

export type Sex = 'male' | 'female';

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
    date: string;
    values: string[];
    templateId: string;
    isRead: boolean;
}

export interface KeyCode {
    id: string;
    date: string;
    createdBy: string;
    keyCode: string;
    series: string;
    target: string;
}

export interface KeyCodeSeries {
    date: string;
    series: string;
    target: string;
    count: number;
}

export interface Assessment {
    _id: string;
    isOutdated: boolean;
    isDeleted: boolean;
    title: string;
    startDate: string;
    endDate: string;
    status: string;
    firstMeasurementStatus: string;
    lastMeasurementStatus: string;
    firstMeasurementStartDate: string;
    firstMeasurementEndDate: string;
    lastMeasurementStartDate: string;
    lastMeasurementEndDate: string;
    kindergartens: {
        instructor: User | null;
        kindergarten: Kindergarten | null;
    }[];
}

export interface AssessmentResult {
    _id: string;
    childId: string;
    kindergartenId: string;
    assessmentId: string;
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
}

export interface ReturnedStatusDTO {
    status: boolean;
}
