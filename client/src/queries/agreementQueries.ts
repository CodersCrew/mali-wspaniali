import { firebase } from '../firebase/firebase';
import { OnSnapshotCallback } from '../firebase/userRepository';
import { Agreement } from '../firebase/types';

export const getAgreements = (callback: OnSnapshotCallback<Agreement[]>) => {
    firebase.agreement.getAgreements(callback);
};
