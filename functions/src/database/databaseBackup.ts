import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const databaseBackup = functions.https.onRequest(
  async (request, response) => {
    // TODO: deal with cors, temporary solution

    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.set('Access-Control-Allow-Headers', '*');

    if (request.method === 'OPTIONS') {
      return response.end();
    } else {
      let tokenId;
      if (request.method === 'GET') {
        // Authorization ? temp version, use express and google middleware?
        if (
          request.headers.authorization &&
          request.headers.authorization.startsWith('Bearer ')
        ) {
          console.log('Found "Authorization" header');
          tokenId = request.get('Authorization').split('Bearer ')[1];
          return admin
            .auth()
            .verifyIdToken(tokenId)
            .then(decodedToken => {
              decodedToken.claims.role
              // TODO deal with authentication
              getData()
                .then(data => {
                  console.log('after getDATA');
                  response.set('Content-Type', 'application/json');
                  response.status(200).send(data);
                })
                .catch(err => console.log(err));
            })
            .catch(err => response.status(401).send(err));
        } else {
          console.log('No authorization found');
          response.send('Unauthorized');
        }
      } else {
        response.send('Please send a GET request');
      }
    }
  },
);

const getData = async () => {
    console.log('GETDATA runs');

  // test data
  const data = { 1: '1', 2: '2' };

/*
  // get all collections from firestore merge into one object and return it


  const db = admin.firestore();
  const userRef = db.collection('user');
  const childRef = db.collection('child');
  const agreementRef = db.collection('agreement');
  const data = {
    userCollection: [],
    childCollection: [],
    agreementCollection: [],
  };

  await userRef.get().then(snapshot => {
    snapshot.forEach(doc => data.userCollection.push(doc.data()));
  });
  await childRef.get().then(snapshot => {
    snapshot.forEach(doc => data.childCollection.push(doc.data()));
  });
  await agreementRef.get().then(snapshot => {
    snapshot.forEach(doc => data.agreementCollection.push(doc.data()));
  });
  */
  return data;
};
