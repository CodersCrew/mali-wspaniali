import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { textColor } from '../../../colors';
import { Article } from '../../../graphql/types';
import { getLastArticles } from '../../../queries/articleQueries';
import { ArticleCarousel } from './HomePageArticleCarousel';
import { BlogArticleCard } from '../../../components/BlogArticleCard';

const isMobile = window.screen.width < 1024;

export const HomePageArticles = () => {
    const classes = useStyles();
    const [articles, setArticles] = useState<Article[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        getLastArticles(6).then(({ data }) => setArticles(data.lastArticles));
    }, []);

    const renderArticles = () => {
        return articles.map(article => {
            return (
                <div className={classes.card} key={article.id}>
                    <BlogArticleCard
                        header={article.header}
                        title={article.title}
                        pictureUrl={article.pictureUrl}
                        description={article.description}
                        link={`/parent/article/${article.id}`}
                        category={article.category}
                        contentHTML={article.contentHTML}
                    />
                </div>
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
        card: {
            maxWidth: '306px',
            marginRight: '60px',
        },
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
    }),
);
