import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { authFunctions } from './auth';
import { databaseBackup } from './database/databaseBackup';

admin.initializeApp(functions.config().firebase);
export const cloudFunctions = { authFunctions, databaseBackup };
