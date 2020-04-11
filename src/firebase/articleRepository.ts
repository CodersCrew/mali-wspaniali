import firebaseApp from 'firebase/app';
import { Article } from './types';
import { logQuery } from '../utils/logQuery';

type dataPromiseTypes = {
    article: Article;
    unsubscribe: () => void;
};

type listDataPromiseTypes = {
    articleList: Article[];
    unsubscribed: () => void;
};

export const articleRepository = (db: firebaseApp.firestore.Firestore) => ({
    getArticleDocById: (articleId: string) => {
        let article: Article;
        const handleData = (snapshot: firebaseApp.firestore.QuerySnapshot) => {
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    if (doc.id === articleId) {
                        article = doc.data() as Article;
                    }
                });
            }
        };
        const getQuery = (
            resolve: (value: dataPromiseTypes) => void,
            reject: (reason: Error) => void,
        ): (() => void) => {
            const articleRef = db.collection('blog-articles').orderBy('category');
            const unsubscribe = articleRef.onSnapshot(
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
        return new Promise<dataPromiseTypes>((resolve, reject) => {
            getQuery(resolve, reject);
        });
    },
    getSimilarArticlesListData: (article: Article, category: string[], tags: string[]) => {
        const articleList: Article[] = [];
        const handleData = (snapshot: firebaseApp.firestore.QuerySnapshot) => {
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    const docData = doc.data() as Article;
                    if (
                        !(articleList.length > 3) &&
                        !articleList.includes(docData) &&
                        docData.titles[0] !== article.titles[0]
                    ) {
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
            resolve: (value: listDataPromiseTypes) => void,
            reject: (reason: Error) => void,
        ): (() => void) => {
            const articleListRef = db.collection('blog-articles').orderBy('category');
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
        return new Promise<listDataPromiseTypes>((resolve, reject) => {
            getQuery(resolve, reject);
        });
    },
});
