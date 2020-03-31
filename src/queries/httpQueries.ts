import firebaseApp from 'firebase/app';

export const getDatabaseBackup = firebaseApp
  .functions()
  .httpsCallable('cloudFunctions-databaseBackup');
