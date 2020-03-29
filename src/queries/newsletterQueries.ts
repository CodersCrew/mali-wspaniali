import { firebase } from '../firebase/firebase';
import { Newsletter } from '../pages/Newsletter/types';


export const createMessage = async (message: Newsletter) => {
    return firebase.newsletter.saveMessage(message);
};