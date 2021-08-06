import React from 'react';
import { useParams } from 'react-router-dom';
import { activePage } from '../../apollo_client';
import { PageContainer } from '../../components/PageContainer';
import { Article } from '../../graphql/types';
import { useArticleWithId } from '../../operations/queries/Articles/getArticleById';
import { BasicInformationPanel } from './BasicInformationPanel/BasicInformationPanel';

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
            <BasicInformationPanel
                value={updatedForm}
                onChange={(key, value) => {
                    setUpdatedForm((prev) => {
                        if (!prev) return;

                        return { ...prev, [key as keyof Article]: value };
                    });
                }}
            />
        </PageContainer>
    );
}
