import { ValidateOldPassword } from './interfaces';

export const validateOldPassword = ({
    password,
    mail,
    authorizeUser,
    callbackValid,
    callbackInvalid,
}: ValidateOldPassword) => {
    (() => {
        authorizeUser({
            variables: { user: { mail, password } },
        })
            .then(() => {
                callbackValid();
            })
            .catch(error => {
                callbackInvalid(error);
            });
    })();
};
