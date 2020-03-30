import { firebase } from '../firebase/firebase';
import { Agreements } from '../firebase/types';
import { OnSnapshotCallback } from '../firebase/userRepository';

export const getAgreements = async (  ) => {
    const {
      agreements,
      unsubscribe,
    } = await firebase.agreements.getAgreementsDatas();
    return {agreements, unsubscribe}
  };
  
  export const getAgreement = (
    agreementId: string,
    onSnapshotCallback: OnSnapshotCallback<Agreements>,
  ) => {
    firebase.agreements.getAgreementDocById(agreementId, onSnapshotCallback);
  };
