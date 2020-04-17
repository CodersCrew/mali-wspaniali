import firebaseApp from 'firebase/app';
import { Article } from './types';
import { logQuery } from '../utils/logQuery';
import { OnSnapshotCallback } from './userRepository';

type dataPromiseTypes = {
    articleList: Article[];
    unsubscribed: () => void;
};

export const articleRepository = (db: firebaseApp.firestore.Firestore) => ({
    getArticleDocById: (articleId: string, onSnapshotCallback: OnSnapshotCallback<Article>) => {
        return db
            .collection('blog-articles')
            .doc(articleId)
            .onSnapshot(snapshot => {
                logQuery(snapshot);
                const article = snapshot.data() as Article;
                if (article) {
                    onSnapshotCallback(article);
                }
            });
    },
    getSimilarArticlesListData: (article: Article, category: string[], tags: string[]) => {
        const articleList: Article[] = [];
        const handleData = (snapshot: firebaseApp.firestore.QuerySnapshot) => {
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    const docData = doc.data() as Article;
                    if (articleList.length <= 3 && !articleList.includes(docData) && docData.title !== article.title) {
                        // eslint-disable-next-line
                        category.some(cat => {
                            if (docData.category.includes(cat)) articleList.push(docData);
                        });
                        // eslint-disable-next-line
                        tags.some(tag => {
                            if (docData.tags.includes(tag)) articleList.push(docData);
                        });
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
                .where('category', 'array-contains', article.category[0])
                .limit(3);
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