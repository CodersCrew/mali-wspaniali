import { firebase } from '../firebase/firebase';
import { Article } from '../firebase/types';

export const getArticleById = async (articleId: string) => {
    const { article, unsubscribe } = await firebase.article.getArticleDocById(articleId);
    return { article, unsubscribe };
};

export const getSimilarArticlesListData = async (article: Article, category: string[], tags: string[]) => {
    const { articleList, unsubscribed } = await firebase.article.getSimilarArticlesListData(article, category, tags);
    return { articleList, unsubscribed };
};
