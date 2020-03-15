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
    newLastVisible,
    newFirstVisible,
  } = await firebase.child.getChildrenData(rowsPerPage, last, first);
  return { documents, unsubscribe, newLastVisible, newFirstVisible };
};
