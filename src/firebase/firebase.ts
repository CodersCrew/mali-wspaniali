import firebaseApp from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import config from './config';
import { authRepository } from './authRepository';
import { childRepository } from './childRepository';
import { userRepository } from './userRepository';
import { newsletterRepository } from './newsletterRepository';

firebaseApp.initializeApp(config);

const auth = firebaseApp.auth();
const firestore = firebaseApp.firestore();

// Disable caching in test enviroment
if (process.env.NODE_ENV !== 'test') {
  firestore.enablePersistence();
}

export const firebase = {
  auth: authRepository(auth),
  child: childRepository(firestore),
  user: userRepository(firestore),
  newsletter: newsletterRepository(firestore),
};

export type User = firebaseApp.User;
export type UserCredential = firebaseApp.auth.UserCredential;
