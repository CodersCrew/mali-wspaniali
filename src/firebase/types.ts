export type Document = firebase.firestore.DocumentData;

export type Agreement = {
  agreementId: string;
  isAgreed: boolean;
};

export type User = {
  id: string;
  email: string;
  role: string;
  agreements: Agreement[];
};
