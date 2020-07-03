import { firebase } from '../firebase/firebase';
import { OnSnapshotCallback } from '../firebase/userRepository';
import { Kindergarten } from '../firebase/types';

export const getKindergartens = (onSnapshotCallback: OnSnapshotCallback<Kindergarten[]>) => {
    firebase.kindergarten.getKindergartens(onSnapshotCallback);
};
