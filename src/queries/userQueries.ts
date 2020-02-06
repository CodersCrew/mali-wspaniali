import { User } from '@firebase/auth-types';
import { firebase } from '../firebase/Firebase';
import { RegistrationUser } from '../pages/RegistrationPage/types';

export const createUser = async (user: RegistrationUser): Promise<User | null> => {
   const userData = await firebase.auth.handleCreateUserWithEmailAndPassword(
      user.email,
      user.password);

    const fbUser = userData.user ?  userData.user : null;
    return fbUser;
}