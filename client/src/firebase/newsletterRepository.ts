import firebase from 'firebase/app';
import { Newsletter } from '../pages/Newsletter/types';

export const newsletterRepository = (firestore: firebase.firestore.Firestore) => ({
    saveNewsletter: (newsletter: Newsletter) => {
        return firestore
            .collection('newsletter')
            .add(newsletter)
            .then(docRef => {
                return { documentId: docRef.id, error: false };
            })
            .catch(error => {
                return { documentId: '', error: error.message };
            });
    },
});
