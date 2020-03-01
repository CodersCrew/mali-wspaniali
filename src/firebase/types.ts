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

export interface Child {
  firstName: string;
  lastName: string;
  userid: string;
  birthYear: number;
  birthQuarter: number;
  city: string;
  kindergartenNo: string;
  groupNo: string;
  results: Result[];
  agreements: Agreement[];
}
