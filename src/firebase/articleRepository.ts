import firebaseApp, { firestore } from 'firebase/app';
import { Article, PaginatedArticleList, Snapshot } from './types';
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
        onSnapshotCallback: OnSnapshotCallback<PaginatedArticleList>,
        category?: string | undefined,
        startAfter?: Snapshot,
        endBefore?: Snapshot
    ) => {
        let query = db.collection('blog-articles') as firestore.Query;
        if (category) {
            query = query.where('category', 'array-contains', category);
        }
        if (startAfter) {
            query = query.startAfter(startAfter);
        }
        if (endBefore) {
            query = query.endBefore(endBefore);
        }
        query.orderBy('date')
            .limit(7)
            .onSnapshot(snapshot => {
                const articleList = [] as Article[];
                const snapshots: Snapshot[] = [];
                let isMore = true;

                snapshot.forEach(snap => {
                    snapshots.push(snap);
                    const docData = snap.data() as Article;
                    articleList.push(docData);
                });
                if (articleList.length < 7) {
                    isMore = false;
                }
                onSnapshotCallback({
                    articleList: articleList.slice(0, 6),
                    firstSnap: snapshots[0],
                    lastSnap: snapshots[5],
                    isMore,
                });
            });

    }
});
