import { firebase } from '../firebase/firebase';
import { Newsletter } from '../pages/Newsletter/types';

export const createNewsletter = async (newsletterData: Newsletter) => {
  return firebase.newsletter.saveNewsletter(newsletterData);
};