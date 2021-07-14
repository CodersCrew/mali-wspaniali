import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useArticleWithId } from '../../operations/queries/Articles/getArticleById';
import ArticleBox from '../../components/ArticleBox/ArticleBox';
import { activePage } from '../../apollo_client';

const ArticlePage = () => {
    const { articleId } = useParams<{ articleId: string }>();
    const { article } = useArticleWithId(articleId);

    useEffect(() => {
        activePage(['parent-menu.blog']);
    }, [articleId]);

    return <ArticleBox article={article} nextButtonTitle="opublikuj" previousButtonTitle="poprzedni" />;
};

export default ArticlePage;
