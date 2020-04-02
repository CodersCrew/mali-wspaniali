import { firebase } from '../firebase/firebase';

export const getAgreements = async () => {
  const {
    agreement,
    unsubscribe,
  } = await firebase.agreement.getAgreementListData();
  return { agreement, unsubscribe };
};
