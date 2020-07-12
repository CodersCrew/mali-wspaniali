import firebaseApp from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';
import config from './config';
import { authRepository } from './authRepository';
import { childRepository } from './childRepository';
import { userRepository } from './userRepository';
import { agreementRepository } from './agreementRepository';
import { newsletterRepository } from './newsletterRepository';
import { notificationRepository } from './notificationRepository';
import { kindergartenRepository } from './kindergartenRepository';
import { invitationCodeRepository } from './invitationCodeRepository';

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
    agreement: agreementRepository(firestore),
    newsletter: newsletterRepository(firestore),
    notification: notificationRepository(firestore),
    kindergarten: kindergartenRepository(firestore),
    invitationCode: invitationCodeRepository(firestore),
};

export type User = firebaseApp.User;
export type UserCredential = firebaseApp.auth.UserCredential;
export type AuthError = firebaseApp.auth.AuthError;
export type QuerySnapshot = firebaseApp.firestore.QuerySnapshot;
export type DocumentData = firebaseApp.firestore.DocumentData;
