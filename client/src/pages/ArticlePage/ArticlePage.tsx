import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, createStyles, Grid, Theme } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { Article } from '../../graphql/types';
import { BreadcrumbsWithDescription } from './BreadcrumbsWithDescription';
import { ArticleHeader } from './ArticleHeader';
import { ArticleContent } from './ArticleContent';
import { ArticleVideo } from './ArticleVideo';
import { ArticleRedactor } from './ArticleRedactor';
import { SingleArticleColors } from '../../colors';
import { ARTICLE_BY_ID } from '../../graphql/articleRepository';

export const ArticlePage = () => {
    const classes = useStyles();
    const { articleId } = useParams<{ articleId: string }>();
    const { data } = useQuery<{ article: Article }>(ARTICLE_BY_ID, { variables: { articleId } });

    if (!data || !data.article) return null;

    return (
        <Grid className={classes.rootGrid} container direction="column">
            <Grid container direction="row">
                <BreadcrumbsWithDescription
                    category={data.article.category}
                    title={data.article.title}
                    readingTime={data.article.readingTime}
                />
            </Grid>
            <Grid container direction="row">
                <ArticleHeader title={data.article.title} />
            </Grid>
            <div className={classes.articleContentContainer}>
                <Grid container direction="row">
                    <ArticleContent
                        category={data.article.category}
                        header={data.article.header}
                        pictureUrl={data.article.pictureUrl}
                        contentHTML={data.article.contentHTML}
                    />
                </Grid>
                <Grid container direction="row">
                    <ArticleVideo videoUrl={data.article.videoUrl} tags={data.article.tags} />
                </Grid>
                <Grid container direction="row">
                    <ArticleRedactor redactor={data.article.redactor} />
                </Grid>
            </div>
        </Grid>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rootGrid: {
            padding: '3.57vw 12.14vw 2.85vw 6.07vw',

            [theme.breakpoints.down('sm')]: {
                padding: 0,
                overflow: 'hidden',
            },
        },
        articleContentContainer: {
            position: 'relative',
            maxWidth: '100%',
            [theme.breakpoints.down('sm')]: {
                backgroundColor: SingleArticleColors.contentBackground,
                width: '100%',
                marginBottom: '20px',
            },
        },
    }),
);
