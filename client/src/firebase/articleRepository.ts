import firebaseApp from 'firebase/app';
import { gql, DocumentNode, ApolloQueryResult } from 'apollo-boost';

import { Article } from './types';
import { OnSnapshotCallback } from './userRepository';
import { client } from '../apollo_client';

export const articleRepository = (db: firebaseApp.firestore.Firestore) => ({
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

export function getArticles(page: number, category?: string): Promise<ApolloQueryResult<{ articles: Article[] }>> {
    let query: DocumentNode;

    if (category) {
        query = gql`
        {
            articles(page: ${page}, category: "${category}") {
                id
                title
                category
                pictureUrl
            }
        }
    `;
    } else {
        query = gql`
        {
            articles(page: ${page}) {
                id
                title
                category
                pictureUrl
            }
        }
    `;
    }

    return client.query({ query });
}

export function getArticleDocById(articleId: string): Promise<ApolloQueryResult<{ article: Article }>> {
    return client.query({
        query: gql`
            {
                article(articleId: "${articleId}") {
                    id
                    title
                    subtitle
                    header
                    category
                    pictureUrl
                    readingTime
                    contentHTML
                    videoUrl
                    tags
                    redactor {
                        avatarUrl
                        firstName
                        lastName
                        profession
                        shortDescription
                    }
                }
            }
        `,
    });
}
