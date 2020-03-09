import { firebase } from '../firebase/firebase';
import { Child } from '../firebase/childRepository';
import { OnSnapshotCallback } from '../firebase/userRepository';

export const fetchChild = (
  childId: string,
  onSnapshotCallback: OnSnapshotCallback<Child>,
) => {
  firebase.child.getChildDocById(childId, onSnapshotCallback);
};
