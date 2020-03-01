import { User } from '@firebase/auth-types';
import { firebase } from '../firebase/firebase';
import { RegistrationUser } from '../pages/RegistrationPage/types';
import { OnSnapshotCallback } from '../firebase/userRepository';

export const createUser = async (
  user: RegistrationUser,
): Promise<User | null> => {
  const userData = await firebase.auth.handleCreateUserWithEmailAndPassword(
    user.email,
    user.password,
  );

  return userData.user || null;
};

export const getUserById = (
  id: string,
  onSnapshotCallback: OnSnapshotCallback,
) => firebase.user.getUserById(id, onSnapshotCallback);
