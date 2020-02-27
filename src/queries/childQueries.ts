import { firebase } from '../firebase/Firebase';

let childInfo: object | undefined;

export const fetchChild = (childId: string | undefined) => {
    firebase.child.getChildDocById(childId).get().then(doc => {
        if (!doc.exists) console.log('No such child!');
        else childInfo = doc.data();
    });
    return childInfo;
};
