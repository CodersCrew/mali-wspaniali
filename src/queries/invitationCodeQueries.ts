import { firebase } from '../firebase/firebase';
// import { OnSnapshotCallback } from '../firebase/userRepository';
// import { InvitationCode } from '../firebase/types';

export const getInvitationCodes = async () => {
    const { invitationCode, unsubscribe } = await firebase.invitationCode.getInvitationCodeData();
    return { invitationCode, unsubscribe };
};

export const getCodeByUserInput = (inputCode: string) => {
    return firebase.invitationCode.getCodeDocByUserInput(inputCode);
};
