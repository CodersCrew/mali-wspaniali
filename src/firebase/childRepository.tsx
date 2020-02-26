import firebaseApp from 'firebase/app';
import 'firebase/auth';


export const childRepository = (firestore: typeof firebaseApp.firestore) => ({
    getChildDocById: (childID: string | undefined) => firestore().collection('child').doc(childID)
});