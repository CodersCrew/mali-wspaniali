import firebaseApp from 'firebase/app';

export type QuerySnapshot = firebaseApp.firestore.QuerySnapshot;

type QuerySnapshotWithPrivateFields<K extends keyof QuerySnapshot, T> = {
  [P in K]: T;
};

type QuerySnapshotWithExtendedQuery = QuerySnapshotWithPrivateFields<
  'query',
  {
    _query: {
      path: {
        segments: string[];
      };
    };
  }
>;

export type DocumentSnapshot = firebaseApp.firestore.DocumentSnapshot;

export const logQuery = (snapshot: QuerySnapshot | DocumentSnapshot) => {
  const { metadata } = snapshot;

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log(
      '%c' +
        `
    Path: ${
      isQuerySnapshot(snapshot)
        ? getQueryDocumentPath(
            (snapshot as unknown) as QuerySnapshotWithExtendedQuery,
          )
        : snapshot.ref.path
    }
    Count: ${
      isQuerySnapshot(snapshot) ? snapshot.size : Number(snapshot.exists)
    }
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

function getQueryDocumentPath(snapshot: QuerySnapshotWithExtendedQuery) {
  // eslint-disable-next-line no-underscore-dangle
  return snapshot.query._query.path.segments.join('/');
}
