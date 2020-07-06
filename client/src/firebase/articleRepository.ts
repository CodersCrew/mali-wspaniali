import firebaseApp, { firestore } from 'firebase/app';
import { Article, PaginatedArticleList, Snapshot } from './types';
import { logQuery } from '../utils/logQuery';
import { OnSnapshotCallback } from './userRepository';

export const articleRepository = (db: firebaseApp.firestore.Firestore) => ({
    getArticleDocById: (articleId: string, onSnapshotCallback: OnSnapshotCallback<Article>) => {
        return db
            .collection('article')
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
            .collection('article')
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
        endBefore?: Snapshot,
    ) => {
        let query = db.collection('article').orderBy('date') as firestore.Query;
        if (category) {
            query = query.where('category', 'array-contains', category);
        }
        if (startAfter) {
            query = query.startAfter(startAfter).limit(7);
        }
        if (endBefore) {
            query = query.endBefore(endBefore).limitToLast(7);
        }
        query.onSnapshot(snapshot => {
            const articleList = [] as Article[];
            const snapshots: Snapshot[] = [];
            let isMore = true;

            snapshot.forEach(snap => {
                snapshots.push(snap);
                const docData = snap.data() as Article;
                docData.id = snap.id;
                articleList.push(docData);
            });
            if (articleList.length < 7) {
                isMore = false;
            }
            let firstIndex = 0;
            let lastIndex = 5;
            if (endBefore && articleList.length > 6) {
                firstIndex = 1;
                lastIndex = 6;
            }
            onSnapshotCallback({
                articleList: articleList.slice(firstIndex, lastIndex + 1),
                firstSnap: snapshots[firstIndex],
                lastSnap: snapshots[lastIndex],
                isMore,
            });
        });
    },
    getArticlesListData: (onSnapshotCallback: OnSnapshotCallback<Article[]>) => {
        return db
            .collection('article')
            .limit(5)
            .orderBy('date', 'desc')
            .onSnapshot(snapshot => {
                const articleList = [] as Article[];
                snapshot.forEach(snap => {
                    const docData = snap.data() as Article;
                    docData.id = snap.id;
                    articleList.push(docData);
                });
                if (articleList) {
                    onSnapshotCallback(articleList);
                }
            });
    },
});
