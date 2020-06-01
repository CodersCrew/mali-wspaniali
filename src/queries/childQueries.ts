import { firebase } from '../firebase/firebase';
import { Document, Child, Result } from '../firebase/types';
import { OnSnapshotCallback } from '../firebase/userRepository';

export const getChildrenData = async (rowsPerPage: number, last: Document | null, first: Document | null) => {
    const { documents, unsubscribe, newLastVisible, newFirstVisible } = await firebase.child.getChildrenData(
        rowsPerPage,
        last,
        first,
    );
    return { documents, unsubscribe, newLastVisible, newFirstVisible };
};

export const fetchChild = (childId: string, onSnapshotCallback: OnSnapshotCallback<Child>) => {
    firebase.child.getChildDocById(childId, onSnapshotCallback);
};

export const fetchChildResults = (childId: string, onSnapshotCallback: OnSnapshotCallback<Result[]>) => {
    firebase.child.getChildResults(childId, onSnapshotCallback);
};

export const getChildrenByUserId = (id: string, onSnapshotCallback: OnSnapshotCallback<Child[]>) => {
    firebase.child.getChildrenByUserId(id, onSnapshotCallback);
};
