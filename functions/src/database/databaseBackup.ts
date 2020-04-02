import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const getData = async () => {
  const database = admin.firestore();
  const data = {
    userCollection: [],
    childCollection: [],
    agreementCollection: [],
  };
  const collectionArray = ['user', 'child', 'agreement'];
  try {
    const collectionPromises = Promise.all(
      collectionArray.map(collection => {
        return database
          .collection(collection)
          .get()
          .then(snapshot => {
            snapshot.forEach(doc =>
              data[`${collection}Collection`].push(doc.data()),
            );
          });
      }),
    );
    await collectionPromises;
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
