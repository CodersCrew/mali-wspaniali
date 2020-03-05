import firebaseApp from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import config from './config';
import { authRepository } from './authRepository';
import { childRepository } from './childRepository';

firebaseApp.initializeApp(config);

const auth = firebaseApp.auth();
const firestore = firebaseApp.firestore();

export const firebase = {
  auth: authRepository(auth),
  db: childRepository(firestore),
};

export type UserCredential = firebaseApp.auth.UserCredential;
export type User = firebaseApp.User;
