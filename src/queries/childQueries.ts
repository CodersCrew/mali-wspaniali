import { firebase } from '../firebase/firebase';
import { Document } from '../firebase/types';

export const getChildrenData = async (
  rowsPerPage: number,
  last: Document | null,
  first: Document | null,
) => {
  const {
    documents,
    unsubscribe,
    loading,
    newLastVisible,
    newFirstVisible,
  } = await firebase.child.getChildrenData(rowsPerPage, last, first);
  return { documents, unsubscribe, loading, newLastVisible, newFirstVisible };
};
