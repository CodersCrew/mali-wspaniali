import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { HomePageArticleItem } from './HomePageArticleItem';
import { textColor } from '../../../colors';
import { load } from '../../../utils/load';
import { Article } from '../../../firebase/types';
import { getArticlesListData } from '../../../queries/articleQuerries';

export const HomePageArticles = () => {
    const classes = useStyles();
    const [articles, setArticles] = useState<Article[]>();
    const [listeners, setListeners] = useState<(() => void)[]>([]);
    const { t } = useTranslation();

    const waitForArticlesData = async () => {
        const { articleList, unsubscribed } = await getArticlesListData();
        if (unsubscribed) {
            setArticles(articleList);
            setListeners([...listeners, unsubscribed]);
        }
    };

    const detachListeners = () => {
        listeners.forEach(listener => () => listener());
    };

    useEffect(() => {
        load(waitForArticlesData());
        return () => detachListeners();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <p className={classes.articleHeader}>{t('home-page-content.recent-news')}</p>
            <div className={classes.articlesList}>
                {articles &&
                    articles.map(article => (
                        <div key={article.title}>
                            <HomePageArticleItem
                                title={article.title}
                                description={article.description}
                                articlePicture={'../../img/mali_wspaniali_img_one.png'}
                            />
                        </div>
                    ))}
            </div>
        </>
    );
};

const useStyles = makeStyles({
    articleHeader: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 21,
        color: textColor,
    },
    articlesList: {
        display: 'flex',
        marginTop: 30,
    },
});
