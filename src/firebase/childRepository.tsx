import firebaseApp from 'firebase/app';
import 'firebase/auth';


export const childRepository = (childQueries: firebaseApp.firestore.Firestore) => ({
    getChildDoc: (childID : string  | undefined) => childQueries.collection('child').doc(childID)
});