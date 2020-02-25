import firebaseApp from 'firebase/app';
import 'firebase/firestore';

export const childRepository = (db: firebaseApp.firestore.Firestore) => ({
  getChildrenFirstPage: (rowsPerPage: number) => {
    let documents: firebaseApp.firestore.DocumentData[] = [];
    let lastVisible: firebaseApp.firestore.DocumentData[] = [];
    const unsubscribe = () => db.collection("child")
      .orderBy("lastName")
      .limit(rowsPerPage)
      .onSnapshot(
        { includeMetadataChanges: true },
        (snapshots) => {
          snapshots.docs.forEach((doc) => documents.push(doc.data()))
          lastVisible.push(snapshots.docs[snapshots.docs.length - 1])
        })
    return { documents, unsubscribe, lastVisible };
  },
  getChildrenNextPage: (rowsPerPage: number, previousLastVisible: firebaseApp.firestore.DocumentData) => {
    let documents: firebaseApp.firestore.DocumentData[] = [];
    let newLastVisible: firebaseApp.firestore.DocumentData[] = [];
    const unsubscribe = () => db.collection("child")
      .orderBy("lastName")
      .limit(rowsPerPage)
      .startAfter(previousLastVisible)
      .onSnapshot(
        { includeMetadataChanges: true },
        (snapshots) => {
          snapshots.docs.forEach((doc) => documents.push(doc.data()))
          newLastVisible.push(snapshots.docs[snapshots.docs.length - 1])
        })
    return { documents, unsubscribe, newLastVisible }
  },
  getChildrenPrevPage: (rowsPerPage: number, previousLastVisible: firebaseApp.firestore.DocumentData) => {
    let documents: firebaseApp.firestore.DocumentData[] = [];
    let newLastVisible: firebaseApp.firestore.DocumentData[] = [];
    const unsubscribe = () => db.collection("child")
      .orderBy("lastName")
      .limit(rowsPerPage)
      .endBefore(previousLastVisible)
      .onSnapshot(
        { includeMetadataChanges: true },
        (snapshots) => {
          console.log(snapshots);
          snapshots.docs.forEach((doc) => documents.push(doc.data()))
          newLastVisible.push(snapshots.docs[snapshots.docs.length - 1])
        })
    return { documents, unsubscribe, newLastVisible }
  }
})