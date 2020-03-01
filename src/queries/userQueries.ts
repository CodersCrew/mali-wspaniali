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

export const getUsers = async (rowsPerPage: number) => {
  const {
    documents,
    unsubscribe,
    loading,
    lastVisible,
  } = await firebase.user.getUsersFirstPage(rowsPerPage);
  return { documents, unsubscribe, loading, lastVisible };
};
export const getUsersPaginated = async (
  rowsPerPage: number,
  last: Document | null,
  first: Document | null,
) => {
  const {
    documents,
    loading,
    unsubscribe,
    newLastVisible,
    newFirstVisible,
  } = await firebase.user.getUsersPaginated(rowsPerPage, last, first);
  return { documents, unsubscribe, loading, newLastVisible, newFirstVisible };
};
