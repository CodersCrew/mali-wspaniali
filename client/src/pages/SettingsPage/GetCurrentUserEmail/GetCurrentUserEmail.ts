import { getUser } from '../../../graphql/userRepository';
import { UpdateCurrentUserEmailStateInterface } from '../ChangePasswordPanel/UpdateCurrentUserEmailStateInterface';

export const getCurrentUserEmail = (callback: UpdateCurrentUserEmailStateInterface) => {
    // eslint-disable-next-line consistent-return
    (async () => {
        try {
            const { data } = await getUser();
            if (data) {
                callback(data.me.mail);
            }
        } catch (err) {
            console.log(`Error: ${err}`);
        }
    })();
};
