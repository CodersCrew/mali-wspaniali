export interface Results {
  title: string;
  description: string;
  date: Date;
  points: number;
}

export interface Agreements {
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
  results: Results[];
  agreements: Agreements;
}