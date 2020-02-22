import firebaseApp from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import config from './config';
import { authRepository } from './authRepository';

firebaseApp.initializeApp(config);

const auth = firebaseApp.auth();

export const firebase = {
  auth: authRepository(auth),
};
