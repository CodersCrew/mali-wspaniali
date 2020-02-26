import { firebase } from '../firebase/Firebase';
import { Child } from '../pages/ChildProfile/ChildProfile'

let childInfo: Child;

export const fetchChild = (childId: string | undefined) => {

    const childRef = firebase.child.getChildDocById(childId);
    childRef.get().then(doc => {
        childInfo = doc.data() as Child;
    }).catch(error => console.log(error));
    return childInfo;
};