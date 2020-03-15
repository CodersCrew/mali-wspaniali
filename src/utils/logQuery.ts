import firebaseApp from 'firebase/app';

type QuerySnapshot = firebaseApp.firestore.QuerySnapshot;
type DocumentSnapshot = firebaseApp.firestore.DocumentSnapshot;

export const logQuery = (snapshot: QuerySnapshot | DocumentSnapshot) => {
  const { metadata } = snapshot;

  if (process.env.NODE_ENV !== 'production') {
    console.log(
      '%c' +
        `
    Count:${isQuerySnapshot(snapshot) ? snapshot.size : Number(snapshot.exists)}
    Source: ${metadata.fromCache ? 'cache' : 'server'}
    `,
      'color:DodgerBlue',
    );
  }
};

function isQuerySnapshot(
  snapshot: QuerySnapshot | DocumentSnapshot,
): snapshot is QuerySnapshot {
  return !!(snapshot as QuerySnapshot).size;
}
