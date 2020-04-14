import firebaseApp from 'firebase/app';

export const getDatabaseBackup = firebaseApp.functions().httpsCallable('cloudFunctions-databaseBackup');

export const getStorageRef = (url: string) => {
    const fileRef = firebaseApp.storage().refFromURL(url);
    return fileRef;
};
