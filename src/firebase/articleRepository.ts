import firebaseApp from 'firebase/app';
import { logQuery } from '../utils/logQuery';
import { Article } from './types';

type dataPromiseTypes = {
    articleList: Article[];
    unsubscribed: () => void;
};

export const articleRepository = (db: firebaseApp.firestore.Firestore) => ({
    getArticlesListData: () => {
        let articleList: Article[] = [];
        const handleData = (snapshot: firebaseApp.firestore.QuerySnapshot) => {
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    const docData = doc.data() as Article;
                    if (articleList.length <= 5) {
                        articleList = [...articleList, docData];
                    }
                });
            }
        };
        const getQuery = (
            resolve: (value: dataPromiseTypes) => void,
            reject: (reason: Error) => void,
        ): (() => void) => {
            const articleListRef = db
                .collection('blog-articles')
                .orderBy('category')
                .limit(5);
            const unsubscribed = articleListRef.onSnapshot(
                snapshot => {
                    logQuery(snapshot);
                    handleData(snapshot);
                    resolve({
                        articleList,
                        unsubscribed,
                    });
                },
                (error: Error) => {
                    reject(error);
                },
            );
            return unsubscribed;
        };
        return new Promise<dataPromiseTypes>((resolve, reject) => {
            getQuery(resolve, reject);
        });
    },
});
