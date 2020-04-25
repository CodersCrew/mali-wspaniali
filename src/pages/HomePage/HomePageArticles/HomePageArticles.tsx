import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
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
                    articles.map(article => {
                        const { articleId, title, description, pictureUrl } = article;
                        const ArticlePictureComponent = (
                            <img className={classes.articleImg} alt="mali_wspaniali_img_one" src={pictureUrl} />
                        );
                        return (
                            <div key={article.title}>
                                <HomePageArticleItem
                                    articleId={articleId}
                                    title={title}
                                    description={description}
                                    ArticlePictureComponent={ArticlePictureComponent}
                                />
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        articleHeader: {
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 21,
            color: textColor,
            margin: '20px 0 20px 0',

            [theme.breakpoints.down('sm')]: {
                fontSize: 15,
                margin: 0,
                lineHeight: '18px',
            },
        },
        articlesList: {
            display: 'flex',
            marginTop: 30,

            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 5,
            },
        },
        articleImg: {
            borderRadius: '4px',
            position: 'relative',
            width: '100%',
            top: '-26px',
            maxHeight: '185px',
            maxWidth: '276px',

            [theme.breakpoints.down('sm')]: {
                maxWidth: 'none',
            },
        },
    }),
);
