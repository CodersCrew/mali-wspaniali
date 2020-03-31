import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const getData = async () => {
  const database = admin.firestore();
  const data = {
    userCollection: [],
    childCollection: [],
    agreementCollection: [],
  };
  try {
    const user = database
      .collection('user')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => data.userCollection.push(doc.data()));
      });
    const child = database
      .collection('child')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => data.childCollection.push(doc.data()));
      });
    const agreement = database
      .collection('agreement')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => data.agreementCollection.push(doc.data()));
      });
    await user;
    await child;
    await agreement;
    return data;
  } catch (error) {
    throw new Error(`Cound not get data, ${error}`);
  }
};

export const databaseBackup = functions.https.onCall(async (data, context) => {
  if (context.auth) {
    try {
      const collectionsData = await getData();
      return collectionsData;
    } catch (error) {
      throw new functions.https.HttpsError('not-found', error);
    }
  } else {
    throw new functions.https.HttpsError('unauthenticated', 'Not signed in');
  }
});
