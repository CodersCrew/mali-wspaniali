import firebaseApp from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import config from './config';
import { authRepository } from './authRepository';
import { childRepository } from './childRepository';
import { userRepository } from './userRepository';

firebaseApp.initializeApp(config);

// Use emulator to test http functions
firebaseApp.functions().useFunctionsEmulator('http://localhost:5001');

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
};

export type User = firebaseApp.User;
export type UserCredential = firebaseApp.auth.UserCredential;
