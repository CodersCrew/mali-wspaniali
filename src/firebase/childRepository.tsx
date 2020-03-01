import firebase from 'firebase/app';

import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

export type ChildData = firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>;

export interface Child {
    firstName: string | undefined;
    lastName: string | undefined;
    userId: string | undefined;
}

export const childRepository = (firestore: firebase.firestore.Firestore) => ({
    getChildDocById: (childId: string | undefined,
        successCallback: (childDoc: ChildData) => void, failCallback: (message: string) => void) =>
        firestore.collection('child').doc(childId).onSnapshot(childDoc => {
            if (childDoc.data()) successCallback(childDoc);
            else failCallback(t('child-profile.no-child'));
        })
});