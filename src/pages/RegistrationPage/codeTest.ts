import { InvitationCode } from '../../firebase/types';

export const codeTest = (userCode: string, codesArray: InvitationCode[]): boolean => {
    return codesArray.some(el => {
        return el.code === userCode && el.used === false;
    });
};
