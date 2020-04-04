import { firebase } from '../firebase/firebase';

export const getSingleArticleById = async (articleId: string) => {
    const { article, unsubscribe } = await firebase.article.getArticleDocById(articleId);
    return { article, unsubscribe };
};
