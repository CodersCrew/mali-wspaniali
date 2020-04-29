import firebaseApp from 'firebase/app';
import { Article } from './types';
import { OnSnapshotCallback } from './userRepository';

export const articleRepository = (db: firebaseApp.firestore.Firestore) => ({
    getArticlesListData: (onSnapshotCallback: OnSnapshotCallback<Article[]>) => {
        return db
            .collection('blog-articles')
            .limit(2)
            .onSnapshot(snapshot => {
                const articleList = [] as Article[];
                snapshot.forEach(snap => {
                    const docData = snap.data() as Article;
                    articleList.push(docData);
                });
                if (articleList) {
                    onSnapshotCallback(articleList);
                }
            });
    },
});
