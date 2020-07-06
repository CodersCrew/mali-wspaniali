import { firebase } from '../firebase/firebase';

export const getCodeByUserInput = (inputCode: string) => {
    return firebase.invitationCode.getCodeDocByUserInput(inputCode);
};
