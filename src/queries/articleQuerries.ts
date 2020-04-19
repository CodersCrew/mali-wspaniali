import { firebase } from '../firebase/firebase';

export const getArticlesListData = async () => {
    const { articleList, unsubscribed } = await firebase.article.getArticlesListData();
    return { articleList, unsubscribed };
};
