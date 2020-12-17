export type ArticleCategory = 'food' | 'activity' | 'emotions' | 'other';

export interface Article {
    _id: string;
    header: string;
    pictureUrl: string;
    title: string;
    subtitle: string;
    contentHTML: string;
    tags: string[];
    category: ArticleCategory;
    description: string;
    videoUrl: string;
    redactor: Redactor;
    date: string;
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

export type User = Omit<Me, 'notifications'>;

export interface Me {
    _id: string;
    mail: string;
    date: string;
    role: Role;
    children: Child[];
    agreements: Agreement[];
    notifications: Notification[];
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
}

export type Sex = 'male' | 'female';

export interface Kindergarten {
    _id: string;
    name: string;
    number: number;
    address: string;
    city: string;
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

export interface TestDTO {
    _id: string;
    isOutdated: boolean;
    isDeleted: boolean;
    title: string;
    startDate: string;
    endDate: string;
    kindergartens: Array<{ kindergartenId: string; instructorId?: string }>;
}

export interface Assessment {
    _id: string;
    isOutdated: boolean;
    isDeleted: boolean;
    title: string;
    startDate: string;
    endDate: string;
    kindergartens: Array<{ kindergarten: { _id: string; name: string }; instructor?: { _id: string } }>;
}

export interface ReturnedStatusDTO {
    status: boolean;
}
