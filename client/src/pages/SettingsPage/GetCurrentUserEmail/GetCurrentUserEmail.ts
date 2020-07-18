import { firebase } from '../../../firebase/firebase';

export const getCurrentUserEmail = () => {
    const currentUser = firebase.auth.getCurrentUser();
    let ret;
    if (currentUser) {
        ret = currentUser.email;
    }

    return ret;
};
