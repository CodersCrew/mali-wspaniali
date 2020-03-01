
export type ChildData = firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>;

export interface Child {
    firstName: string;
    lastName: string;
    userId: string
}

export const childRepository = (firestore: firebase.firestore.Firestore) => ({
    getChildDocById: (childId: string | undefined,
        successCallback: (childDoc?: ChildData) => void, failCallback: (message: string) => void) =>
        firestore.collection('child').doc(childId).onSnapshot(childDoc => {
            if (childDoc.data()) successCallback(childDoc);
            else failCallback('Sorry, there is no child with this ID');
        })
});