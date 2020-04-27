import firebaseApp from 'firebase/app';
import { Article } from './types';
import { logQuery } from '../utils/logQuery';
import { OnSnapshotCallback } from './userRepository';

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
    getSimilarArticlesListData: (
        article: Article,
        category: string[],
        tags: string[],
        onSnapshotCallback: OnSnapshotCallback<Article[]>,
    ) => {
        return db
            .collection('blog-articles')
            .where('category', 'array-contains', article.category[0])
            .limit(3)
            .onSnapshot(snapshot => {
                const articleList = [] as Article[];
                snapshot.forEach(snap => {
                    const docData = snap.data() as Article;
                    if (docData.title !== article.title && !articleList.includes(docData)) articleList.push(docData);
                });
                if (articleList) {
                    onSnapshotCallback(articleList);
                }
            });
    },
    getArticles: (
        onSnapshotCallback: OnSnapshotCallback<Article[]>
    ) => {
        // const unsubscribe = 
        db
            .collection('blog-articles')
            .orderBy('date')
            .limit(6)
            .onSnapshot(snapshot => {
                const articleList = [] as Article[];
                snapshot.forEach(snap => {
                    const docData = snap.data() as Article;
                    articleList.push(docData);
                });
                if (articleList) {
                    onSnapshotCallback(articleList);
                }
                // unsubscribe();
            });

    }
});
