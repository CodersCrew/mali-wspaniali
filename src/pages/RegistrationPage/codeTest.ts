import { InvitationCode } from '../../firebase/types';

export const codeTest = (userCode: string, dbCode: InvitationCode[]): boolean =>
    dbCode[0].code === userCode && dbCode[0].used === false;
