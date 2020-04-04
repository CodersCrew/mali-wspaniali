export type Document = firebase.firestore.DocumentData;

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
    results: Result[];
    agreements: Agreement[];
}

export type User = {
    id: string;
    email: string;
    role: string;
    agreements: Agreement[];
};
