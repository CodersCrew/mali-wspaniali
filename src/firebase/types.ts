export type Document = firebase.firestore.DocumentData;

export interface Article {
  articleId: string;    
  titles: string[];      //[1]short[2]long
  content: string[];    //[n]header[n+1]content
  tags: string[];
  category: string;
  description: string;
  videoUrl: string;        //last video yt bottom
  readingTime: number;
  redactor: Redactor;
  date: Date;
}

export interface Redactor {
  userId: string;
  firstName: string;
  lastName: string;
  profession: string;
  photoUrl: string;
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

export interface Child {
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
