export type childData = firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>;
export interface Child {
    firstName: string;
    lastName: string;
    userId: string
}