import { firebase } from '../firebase/firebase';
import { Document } from '../firebase/types';

export const getChildrenFirstPage = (rowsPerPage: number) => {
  const {
    documents,
    unsubscribe,
    lastVisible,
  } = firebase.child.getChildrenFirstPage(rowsPerPage);
  return { documents, unsubscribe, lastVisible };
};

export const getChildrenPaginated = (
  rowsPerPage: number,
  last: Document | null,
  first: Document | null,
) => {
  const {
    documents,
    unsubscribe,
    newLastVisible,
    newFirstVisible,
  } = firebase.child.getChildrenPaginated(rowsPerPage, last, first);
  return { documents, unsubscribe, newLastVisible, newFirstVisible };
};
