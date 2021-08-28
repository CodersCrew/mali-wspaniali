import { Box } from '@material-ui/core';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { activePage } from '../../apollo_client';
import { PageContainer } from '../../components/PageContainer';
import { useArticleWithId } from '../../operations/queries/Articles/getArticleById';
import ArticlePage from '../ArticlePage/ArticlePage';
import { ActionButtons } from './ActionButtons/ActionButtons';
import { AuthorInformationPanel } from './AuthorInformationPanel/AuthorInformationPanel';
import { BasicInformationPanel } from './BasicInformationPanel/BasicInformationPanel';
import { ContentCreator } from './ContentCreator/ContentCreator';
import { articleStore } from './ArticleCreator/ArticleCreatorStore';

export default observer(() => {
    React.useEffect(() => {
        activePage(['admin-menu.articles.title']);
    }, []);
    const params = useParams<{ articleId: string }>();
    const [isPreview, setIsPreview] = React.useState(false);

    const { article } = useArticleWithId(params.articleId);

    React.useEffect(() => {
        if (article) {
            articleStore.setArticle(article);
        }
    }, [article]);

    if (!articleStore.article) return null;

    if (isPreview)
        return (
            <>
                <ArticlePage />
                <PageContainer>
                    <Box my={3}>
                        <ActionButtons isPreview onPreviewClick={onPreviewClick} />
                    </Box>
                </PageContainer>
            </>
        );

    return (
        <PageContainer>
            <Box mb={3}>
                <BasicInformationPanel />
            </Box>
            <Box mb={3}>
                <ContentCreator />
            </Box>
            <Box mb={3}>
                <AuthorInformationPanel />
            </Box>
            <Box mb={3}>
                <ActionButtons onPreviewClick={onPreviewClick} />
            </Box>
        </PageContainer>
    );

    function onPreviewClick() {
        setIsPreview((prev) => !prev);
    }
});
