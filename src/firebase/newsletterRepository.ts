import firebase from 'firebase/app';
import { Newsletter } from '../pages/Newsletter/types';
import { load } from '../utils/load';

export const newsletterRepository = (firestore: firebase.firestore.Firestore) => ({
    saveNewsletter: (newsletter: Newsletter) => {
        const saveNewsletterPromise = firestore
            .collection('newsletter')
            .add(newsletter)
            .then(docRef => {
                return { documentId: docRef.id, error: false };
            })
            .catch(error => {
                return { documentId: '', error: error.message };
            });
        return load(saveNewsletterPromise);
    },
});
