import { firebase } from '../firebase/firebase';

export const getInvitationCodes = async () => {
    const { invitationCode, unsubscribe } = await firebase.invitationCode.getInvitationCodeData();
    return { invitationCode, unsubscribe };
};
