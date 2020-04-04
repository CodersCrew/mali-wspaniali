import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSubscribed } from '../../hooks/useSubscribed';
import { OnSnapshotCallback } from '../../firebase/userRepository';


export const SingleBlogArticle = () => {
    const { t } = useTranslation(); 
    const { articleId } = useParams<{ articleId: string}>();
    const article = useSubscribed<Article | null>(
        (callback: OnSnapshotCallback<Article>) =>
        getArticleById(articleId, callback),
    ) as Article | null;

    return article ? 
    (
        <>
        </>
    ) : 
        (
            <>
            </>
        )

}
