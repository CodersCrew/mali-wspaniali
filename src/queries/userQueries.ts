import { User } from '@firebase/auth-types';
import { firebase } from '../firebase/firebase';
import { RegistrationUser } from '../pages/RegistrationPage/types';

export const createUser = async (
  user: RegistrationUser,
): Promise<User | null> => {
  const userData = await firebase.auth.handleCreateUserWithEmailAndPassword(
    user.email,
    user.password,
  );

  return userData.user || null;
};

export const getUsers = (rowsPerPage: number) => {
  const {
    documents,
    unsubscribe,
  } = firebase.user.getUsersFirstPage(rowsPerPage);
  return { documents, unsubscribe };
};
