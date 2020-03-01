
export type ChildData = firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>;

export class Child {
    childDetails: {
        firstName: string | undefined;
        lastName: string | undefined;
        userId: string | undefined;
    } | undefined
}

export const childRepository = (firestore: firebase.firestore.Firestore) => ({
    getChildDocById: (childId: string | undefined,
        successCallback: (childDoc?: ChildData) => void, failCallback: (message: string) => void) =>
        firestore.collection('child').doc(childId).onSnapshot(childDoc => {
            if (childDoc.data()) successCallback(childDoc);
            else failCallback('Sorry, there is no child with this ID');
        })
});