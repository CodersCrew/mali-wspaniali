export type Document = firebase.firestore.DocumentData;

export type Agreement = {
  agreementId: string;
  isAgreed: boolean;
};

export type User = {
  email: string;
  role: string;
  agreements: Agreement[];
};
