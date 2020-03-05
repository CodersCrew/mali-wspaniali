import { firebase } from '../firebase/firebase';
import { Child } from '../firebase/childRepository';

export const fetchChild = (
  childId: string,
  successCallback: (childDoc: Child) => void,
  failCallback: (message: string) => void,
) => {
  firebase.db.getChildDocById(childId, successCallback, failCallback);
};
