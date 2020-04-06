export type Document = firebase.firestore.DocumentData;

export interface Article {
  header: string;
  pictureUrl: string;    
  titles: string[];      //[1]short[2]long
  contentHTML: string;    
  tags: string[];
  category: string[];
  description: string;
  videoYtUrl: string;        //last video
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
    results: Result[];
    agreements: Agreement[];
}

export type User = {
    id: string;
    email: string;
    role: string;
    agreements: Agreement[];
};
