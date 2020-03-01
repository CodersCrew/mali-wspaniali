import { firebase } from '../firebase/firebase';
import { ChildData } from '../firebase/childRepository';

export const fetchChild = (childId: string | undefined, successCallback: (childDoc: ChildData) => void,
    failCallback: (message: string) => void) => {
    firebase.child.getChildDocById(childId, successCallback, failCallback);
};

