import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, createStyles, Grid, Theme } from '@material-ui/core';
import { useAuthorization } from '../../hooks/useAuthorization';
import { getArticleById } from '../../queries/articleQueries';
import { Article } from '../../graphql/types';
import { BreadcrumbsWithDescription } from './BreadcrumbsWithDescription';
import { ArticleHeader } from './ArticleHeader';
import { ArticleContent } from './ArticleContent';
import { ArticleVideo } from './ArticleVideo';
import { ArticleRedactor } from './ArticleRedactor';
import { SingleArticleColors } from '../../colors';

export const SingleBlogArticle = () => {
    useAuthorization(true);
    const classes = useStyles();
    const [article, setArticle] = useState<null | Article>(null);
    const { articleId } = useParams<{ articleId: string }>();

    useEffect(() => {
        getArticleById(articleId).then(({ data }) => setArticle(data.article));
    }, [articleId]);

    if (article) {
        return (
            <Grid className={classes.rootGrid} container direction="column">
                <Grid container direction="row">
                    <BreadcrumbsWithDescription
                        category={article.category}
                        title={article.title}
                        readingTime={article.readingTime}
                    />
                </Grid>
                <Grid container direction="row">
                    <ArticleHeader title={article.title} />
                </Grid>
                <div className={classes.articleContentContainer}>
                    <Grid container direction="row">
                        <ArticleContent
                            category={article.category}
                            header={article.header}
                            pictureUrl={article.pictureUrl}
                            contentHTML={article.contentHTML}
                        />
                    </Grid>
                    <Grid container direction="row">
                        <ArticleVideo videoUrl={article.videoUrl} tags={article.tags} />
                    </Grid>
                    <Grid container direction="row">
                        <ArticleRedactor redactor={article.redactor} />
                    </Grid>
                </div>
            </Grid>
        );
    }
    // TODO: display a placeholder when there is no article

    return <div />;
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
            [theme.breakpoints.down('sm')]: {
                backgroundColor: SingleArticleColors.contentBackground,
                width: '100%',
                marginBottom: '20px',
            },
        },
    }),
);
