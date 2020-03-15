import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { cloudFunctions } from './auth';

admin.initializeApp(functions.config().firebase);

export default cloudFunctions;
