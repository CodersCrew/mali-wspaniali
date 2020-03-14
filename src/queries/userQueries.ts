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

export const getUsersData = async (
  rowsPerPage: number,
  last: Document | null,
  first: Document | null,
) => {
  const {
    documents,
    unsubscribe,
    newLastVisible,
    newFirstVisible,
  } = await firebase.user.getUsersData(rowsPerPage, last, first);
  return { documents, unsubscribe, newLastVisible, newFirstVisible };
};
