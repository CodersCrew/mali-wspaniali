import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { HomePageArticleItem } from './HomePageArticleItem';
import { textColor } from '../../../colors';
import { Article } from '../../../firebase/types';
import { getArticles } from '../../../queries/articleQueries';
import { ArticleCarousel } from './HomePageArticleCarousel';

const isMobile = window.screen.width < 1024;

export const HomePageArticles = () => {
    const classes = useStyles();
    const [articles, setArticles] = useState<Article[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        getArticles(0).then(({ data }) => setArticles(data.articles));
    }, []);

    const renderArticles = () => {
        return articles.map(({ id, title, description, pictureUrl }) => {
            const ArticlePictureComponent = (
                <img className={classes.articleImg} alt="mali_wspaniali_article" src={pictureUrl} />
            );
            return (
                <HomePageArticleItem
                    key={title}
                    articleId={id}
                    title={title}
                    description={description}
                    ArticlePictureComponent={ArticlePictureComponent}
                />
            );
        });
    };

    return (
        <>
            <h2 className={classes.articleHeader}>{t('home-page-content.recent-news')}</h2>
            <div className={classes.articlesList}>
                {!isMobile && articles.length > 4 ? (
                    <ArticleCarousel>{renderArticles()}</ArticleCarousel>
                ) : (
                    renderArticles()
                )}
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

            [theme.breakpoints.down('md')]: {
                marginLeft: 30,
            },

            [theme.breakpoints.down('xs')]: {
                flexDirection: 'column',
                alignItems: 'center',
                margin: '5px 0 0 0',
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
