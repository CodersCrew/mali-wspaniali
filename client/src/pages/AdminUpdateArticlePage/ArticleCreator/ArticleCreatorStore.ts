import { makeAutoObservable } from 'mobx';
import { Article, Redactor } from '../../../graphql/types';

class ArticleStore {
    article: Article | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    update = (key: keyof Article, value: string) => {
        if (!this.article || key === 'redactor') return;

        // @ts-ignore
        this.article[key] = value;
    };

    updateRedactor = (key: keyof Redactor, value: string) => {
        if (!this.article) return;

        this.article.redactor[key] = value;
    };

    setArticle = (article: Article) => {
        this.article = article;
    };
}

export const articleStore = new ArticleStore();
