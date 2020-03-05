import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as onCreateFunctions from './auth/onCreate';

admin.initializeApp(functions.config().firebase);

module.exports = {
  ...onCreateFunctions,
};
