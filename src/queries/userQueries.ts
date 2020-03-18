import { User } from '@firebase/auth-types';
import { firebase } from '../firebase/firebase';
import { RegistrationUser } from '../pages/RegistrationPage/types';
import { OnSnapshotCallback } from '../firebase/userRepository';
import { Parent } from '../pages/ParentProfile/types';

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
  onSnapshotCallback: OnSnapshotCallback<Parent>,
) => firebase.user.getUserById(id, onSnapshotCallback);

export const getUserRole = async (user: User): Promise<string> => {
  const IdTokenResult = await user.getIdTokenResult();
  return IdTokenResult.claims.role;
};
