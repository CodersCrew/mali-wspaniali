import { Box } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { activePage } from '../../apollo_client';
import { PageContainer } from '../../components/PageContainer';
import { Article } from '../../graphql/types';
import { useArticleWithId } from '../../operations/queries/Articles/getArticleById';
import ArticlePage from '../ArticlePage/ArticlePage';
import { ActionButtons } from './ActionButtons/ActionButtons';
import { AuthorInformationPanel } from './AuthorInformationPanel/AuthorInformationPanel';
import { BasicInformationPanel } from './BasicInformationPanel/BasicInformationPanel';
import { ContentCreator } from './ContentCreator/ContentCreator';

export default function CreateArticlePage() {
    React.useEffect(() => {
        activePage(['admin-menu.articles.title']);
    }, []);
    const params = useParams<{ articleId: string }>();
    const [isPreview, setIsPreview] = React.useState(false);

    const { article } = useArticleWithId(params.articleId);

    const [updatedForm, setUpdatedForm] = React.useState<Article | undefined>(article);

    React.useEffect(() => {
        if (article) setUpdatedForm(article);
    }, [params.articleId, article]);

    if (!updatedForm) return null;

    if (isPreview)
        return (
            <>
                <ArticlePage localArticle={updatedForm} />
                <Box my={3}>
                    <ActionButtons
                        isPreview={isPreview}
                        value={updatedForm}
                        onPreviewClick={() => setIsPreview(true)}
                    />
                </Box>
            </>
        );

    return (
        <PageContainer>
            <Box mb={3}>
                <BasicInformationPanel value={updatedForm} onChange={updateLocalArticle} />
            </Box>
            <Box mb={3}>
                <ContentCreator value={updatedForm} onChange={updateLocalArticle} />
            </Box>
            <Box mb={3}>
                <AuthorInformationPanel value={updatedForm} onChange={updateLocalArticle} />
            </Box>
            <Box mb={3}>
                <ActionButtons value={updatedForm} onPreviewClick={() => setIsPreview(true)} />
            </Box>
        </PageContainer>
    );

    function updateLocalArticle(key: string, value: string | Record<string, string>) {
        setUpdatedForm((prev) => {
            if (!prev) return;

            return { ...prev, [key as keyof Article]: value };
        });
    }
}
