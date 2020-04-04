import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthorization } from '../../hooks/useAuthorization';
import { getSingleArticleById } from '../../queries/singleArticleQueries';
import { load } from '../../utils/load';
import { Article } from '../../firebase/types';
import { Typography } from '@material-ui/core';


export const SingleBlogArticle = () => {
    useAuthorization(true, '/', ['admin', 'parent']);
    const { t } = useTranslation();
    const { articleId } = useParams<{ articleId: string }>();
    const [article, setArticle] = useState<Article>();
    const [listeners, setListeners] = useState<(() => void)[]>([]);

    const detachListeners = () => {
        listeners.forEach(listener => () => listener());
    };

    const waitForArticleData = async (articleId: string) => {
        const { article, unsubscribe } = await getSingleArticleById(articleId);
        if (unsubscribe) {
            setArticle(article);
            setListeners([...listeners, unsubscribe]);
        };
    };

    useEffect(() => {
        load(waitForArticleData(articleId));
        return () => detachListeners();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return article ?
        (
            <>
                <Typography variant="h4">
                    Jest
            </Typography>
            </>
        ) :
        (
            <>
                <Typography variant="h4">
                    Ni ma
            </Typography>
            </>
        )

}
