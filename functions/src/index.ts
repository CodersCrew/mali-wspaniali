import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { authCloudFunctions } from './auth';
import { newsletterCloudFunctions } from './newsletter';

admin.initializeApp(functions.config().firebase);

export default {
    ...authCloudFunctions,
    ...newsletterCloudFunctions,
};
