import firebaseApp from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';
import config from './config';
import { authRepository } from './authRepository';
import { childRepository } from './childRepository';
import { userRepository } from './userRepository';
import { adminAgreementRepository } from './adminAgreementRepository';
import { newsletterRepository } from './newsletterRepository';
import { articleRepository } from './articleRepository';

firebaseApp.initializeApp(config);

const auth = firebaseApp.auth();
const firestore = firebaseApp.firestore();

// Disable caching in test environment
if (process.env.NODE_ENV !== 'test') {
    firestore.enablePersistence();
}

export const firebase = {
    auth: authRepository(auth),
    child: childRepository(firestore),
    user: userRepository(firestore),
    agreement: adminAgreementRepository(firestore),
    newsletter: newsletterRepository(firestore),
    article: articleRepository(firestore),
};

export type User = firebaseApp.User;
export type UserCredential = firebaseApp.auth.UserCredential;
export type QuerySnapshot = firebaseApp.firestore.QuerySnapshot;
