import { firestore } from 'firebase';

export type Document = firestore.DocumentData;
export type Snapshot = firestore.DocumentSnapshot;

export interface Article {
    id: string;
    header: string;
    pictureUrl: string;
    title: string;
    subtitle: string;
    contentHTML: string;
    tags: string[];
    category: string;
    description: string;
    videoUrl: string;
    readingTime: number;
    redactor: Redactor;
    date: Date;
}

export interface Redactor {
    avatarUrl: string;
    firstName: string;
    lastName: string;
    profession: string;
    shortDescription: string;
}

export interface Result {
    dateOfTest: Date;
    ageOfChild: number;
    testPeriod: 'begin' | 'end';
    schoolYear: string;
    strengthCentimeters: number;
    strengthPoints: number;
    powerCentimeters: number;
    powerPoints: number;
    speedSeconds: number;
    speedPoints: number;
    agilitySeconds: number;
    agilityPoints: number;
    sumOfPoints: number;
    updatedAt: Date;
}

export interface UserAgreement {
    id: string;
    agreementId: string;
    checked: boolean;
}

export interface Agreement {
    id: string;
    content: string;
    required: boolean;
    title: string;
}

export interface Child {
    id: string;
    firstName: string;
    lastName: string;
    userId: string;
    birthYear: number;
    birthQuarter: number;
    city: string;
    kindergartenNo: string;
    groupNo: string;
    sex: string;
    results: Result[];
}

export type User = {
    id: string;
    email: string;
    role: string;
    agreements: UserAgreement[];
};

export type Notification = {
    text: string;
    date: Timestamp;
    isRead: boolean;
    id: string;
};

export type Timestamp = {
    seconds: number;
    nanoseconds: number;
    toDate: () => Date;
};

export type NotificationPaginatedList = {
    notifications: Notification[];
    firstSnap: Snapshot;
    lastSnap: Snapshot;
    isMore: boolean;
};
export interface Kindergarten {
    city: string;
    number: string;
    id: string;
}
