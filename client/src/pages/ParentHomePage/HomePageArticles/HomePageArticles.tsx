import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { textColor } from '../../../colors';
import { Article } from '../../../graphql/types';
import { ArticleCarousel } from './HomePageArticleCarousel';
import { BlogArticleCard } from '../../../components/Blog/BlogArticleCard';
import { useBreakpoints } from '../../../queries/useBreakpoints';

interface Props {
    articles: Article[];
}

export const HomePageArticles = ({ articles }: Props) => {
    const classes = useStyles();
    const device = useBreakpoints();
    const { t } = useTranslation();

    const renderArticles = () => {
        return articles.map((article) => {
            return (
                <div className={classes.card} key={article._id}>
                    <BlogArticleCard
                        title={article.title}
                        pictureUrl={article.pictureUrl}
                        description={article.description}
                        link={`/parent/article/${article._id}`}
                        category={article.category}
                    />
                </div>
            );
        });
    };

    return (
        <>
            <h2 className={classes.articleHeader}>
                {t('home-page-content.recent-news')}
            </h2>
            <div className={classes.articlesList}>
                {device !== 'DESKTOP' && articles.length > 4 ? (
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
            flexWrap: 'wrap',
            marginTop: 30,

            [theme.breakpoints.down('xs')]: {
                flexDirection: 'column',
                alignItems: 'center',
                margin: '5px 0 0 0',
            },
        },
    }),
);
