import { firebase } from '../firebase/firebase';
import { Article } from '../firebase/types';
import { OnSnapshotCallback } from '../firebase/userRepository';

export const getArticlesListData = async (onSnapshotCallback: OnSnapshotCallback<Article[]>) => {
    firebase.article.getArticlesListData(onSnapshotCallback);
};
