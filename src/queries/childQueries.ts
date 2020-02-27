import { firebase } from '../firebase/Firebase';
import { childData } from '../pages/ChildProfile/childTypes';

export const fetchChild = (childId: string | undefined, successCallback: (childDoc: childData | undefined) => void,
    failCallback: (error: Error) => void) => {
    firebase.child.getChildDocById(childId).then((childDoc: childData) => {
        successCallback(childDoc);
    }).catch(failCallback);
};

