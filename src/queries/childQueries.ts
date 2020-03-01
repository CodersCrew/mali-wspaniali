import { firebase } from '../firebase/firebase';
import { Document } from '../firebase/types';

export const getChildrenFirstPage = async (rowsPerPage: number) => {
  const {
    documents,
    unsubscribe,
    loading,
    lastVisible,
  } = await firebase.child.getChildrenFirstPage(rowsPerPage);
  return { documents, unsubscribe, loading, lastVisible };
};

export const getChildrenPaginated = async (
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
  } = await firebase.child.getChildrenPaginated(rowsPerPage, last, first);
  return { documents, unsubscribe, loading, newLastVisible, newFirstVisible };
};
