import firebaseApp from 'firebase/app';


export type ChildData = firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>;
export interface Child {
    firstName: string;
    lastName: string;
    userId: string
}


export const childRepository = (firestore: typeof firebaseApp.firestore) => ({
    getChildDocById: (childId: string | undefined, successCallback: (childDoc?: ChildData) => void, failCallback: (error: Error) => void) => firestore().collection('child').doc(childId).onSnapshot(childDoc => {
        if (childDoc) successCallback(childDoc);
        else failCallback(new Error);
    })
});