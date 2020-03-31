import { firebase } from '../firebase/firebase';

export const getAgreements = async () => {
  const {
    agreements,
    unsubscribe,
  } = await firebase.agreements.getAgreementsDatas();
  return { agreements, unsubscribe };
};
