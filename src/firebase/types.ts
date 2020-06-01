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
    category: string[];
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
    title: string;
    description: string;
    date: Date;
    points: number;
}

export interface Agreement {
    agreementId: string;
    isAgreed: boolean;
}

export interface AdminAgreement {
    agreementId: string;
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
    agreements: Agreement[];
}

export type User = {
    id: string;
    email: string;
    role: string;
    agreements: Agreement[];
};

export interface PaginatedArticleList {
    articleList: Article[];
    firstSnap: Snapshot;
    lastSnap: Snapshot;
    isMore: boolean;
}

export type Notification = {
    text: string;
    date: Timestamp;
    isRead: boolean;
    id: string;
};

export type Timestamp = {
    seconds: number;
    nanoseconds: number;
    toDate: () => [];
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
