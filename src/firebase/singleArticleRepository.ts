import firebaseApp from 'firebase/app';
import { Article } from './types';
import { logQuery } from '../utils/logQuery';

type dataPromiseTypes = {
    article: Article;
    unsubscribe: () => void;
};

export const singleArticleRepository = (db: firebaseApp.firestore.Firestore) => ({
    getArticleDocById: (
        articleId: string,
    ) => {
        let article: Article;
        const handleData = (snapshot: firebaseApp.firestore.QuerySnapshot) => {
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    if (doc.id === articleId) {
                        article = doc.data() as Article;
                    };
                });
            };
        };
        const getQuery = (
            resolve: (value: dataPromiseTypes) => void,
            reject: (reason: Error) => void,
        ): (() => void) => {
            const articleRef =
                db.collection('blog-articles')
                    .doc(articleId);
            const unsubscribe =
                articleRef.onSnapshot(
                    snapshot => {
                        logQuery(snapshot);
                        handleData(snapshot);
                        resolve({
                            article,
                            unsubscribe,
                        });
                    },
                    (error: Error) => {
                        reject(error);
                    },
                );
            return unsubscribe;
        };
        return new Promise<dataPromiseTypes>((resolve,
            reject) => {
            getQuery(resolve, reject);
        });
    },
});
