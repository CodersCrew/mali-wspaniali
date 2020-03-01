import firebaseApp from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import config from './config';
import { authRepository } from './authRepository';
import { userRepository } from './userRepository';

firebaseApp.initializeApp(config);

const auth = firebaseApp.auth();
const firestore = firebaseApp.firestore();

export const firebase = {
  auth: authRepository(auth),
  user: userRepository(firestore),
};

export type UserCredential = firebaseApp.auth.UserCredential;
export type User = firebaseApp.User;
export type DocumentSnapshot = firebaseApp.firestore.DocumentSnapshot;
