import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, createStyles, Grid, Theme } from '@material-ui/core';
import { useAuthorization } from '../../hooks/useAuthorization';
import { getArticleById, getSimilarArticlesListData } from '../../queries/articleQueries';
import { Article } from '../../firebase/types';
import { OnSnapshotCallback } from '../../firebase/userRepository';
import { ArticlePath } from './ArticlePath';
import { ArticleHeader } from './ArticleHeader';
import { ArticleContent } from './ArticleContent';
import { ArticleVideo } from './ArticleVideo';
import { ArticleRedactor } from './ArticleRedactor';
import { useSubscribed } from '../../hooks/useSubscribed';
import { Video, Path, Content } from './types';
import { SingleArticleColors } from '../../colors';

export const SingleBlogArticle = () => {
    useAuthorization(true);
    const classes = useStyles();
    const { articleId } = useParams<{ articleId: string }>();

    const article = useSubscribed<Article>((onSnapshotCallback: OnSnapshotCallback<Article>) =>
        getArticleById(articleId, onSnapshotCallback),
    ) as Article;

    const similarArticles = useSubscribed<Article[], Article>(
        (onSnapshotCallback: OnSnapshotCallback<Article[]>) => {
            if (article) {
                getSimilarArticlesListData(article, article.category, article.tags, onSnapshotCallback);
            }
        },
        [],
        [article],
    ) as Article[];

    if (article) {
        const path = {
            category: article.category[0],
            subtitle: article.subtitle,
            readingTime: article.readingTime,
        } as Path;

        const content = {
            category: article.category,
            header: article.header,
            pictureUrl: article.pictureUrl,
            contentHTML: article.contentHTML,
        } as Content;

        const video = {
            videoUrl: article.videoUrl,
            tags: article.tags,
        } as Video;

        return (
            <Grid className={classes.rootGrid} container direction="column">
                <Grid container direction="row">
                    <ArticlePath path={path} />
                </Grid>
                <Grid container direction="row">
                    <ArticleHeader title={article.title} />
                </Grid>
                <div className={classes.articleContentContainer}>
                    <Grid container direction="row">
                        <ArticleContent content={content} />
                    </Grid>
                    <Grid container direction="row">
                        <ArticleVideo video={video} />
                    </Grid>
                    <Grid container direction="row">
                        <ArticleRedactor redactor={article.redactor} />
                    </Grid>
                    {similarArticles && <Grid />}
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
            },
        },
        articleContentContainer: {
            [theme.breakpoints.down('sm')]: {
                backgroundColor: SingleArticleColors.contentBackground,
                width: '100%',
                marginBottom: '20px',
            },
        }
    }),
);
