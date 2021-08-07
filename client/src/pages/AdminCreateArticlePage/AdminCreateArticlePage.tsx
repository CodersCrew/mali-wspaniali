import { Box } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { activePage } from '../../apollo_client';
import { PageContainer } from '../../components/PageContainer';
import { Article } from '../../graphql/types';
import { useArticleWithId } from '../../operations/queries/Articles/getArticleById';
import { AuthorInformationPanel } from './AuthorInformationPanel/AuthorInformationPanel';
import { BasicInformationPanel } from './BasicInformationPanel/BasicInformationPanel';
import { ContentCreator } from './ContentCreator/ContentCreator';

export default function CreateArticlePage() {
    React.useEffect(() => {
        activePage(['admin-menu.articles.title']);
    }, []);
    const params = useParams<{ articleId: string }>();

    const { article } = useArticleWithId(params.articleId);

    const [updatedForm, setUpdatedForm] = React.useState<Article | undefined>(article);

    React.useEffect(() => {
        if (article) setUpdatedForm(article);
    }, [params.articleId, article]);

    if (!updatedForm) return null;

    return (
        <PageContainer>
            <Box mb={3}>
                <BasicInformationPanel value={updatedForm} onChange={updateLocalArticle} />
            </Box>
            <Box mb={3}>
                <ContentCreator value={updatedForm} onChange={updateLocalArticle} />
            </Box>
            <AuthorInformationPanel value={updatedForm} onChange={updateLocalArticle} />
        </PageContainer>
    );

    function updateLocalArticle(key: string, value: string) {
        setUpdatedForm((prev) => {
            if (!prev) return;

            return { ...prev, [key as keyof Article]: value };
        });
    }
}
