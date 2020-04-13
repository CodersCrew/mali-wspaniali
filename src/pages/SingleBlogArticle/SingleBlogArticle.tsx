import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, createStyles, Grid, Theme } from '@material-ui/core';

import { useAuthorization } from '../../hooks/useAuthorization';
import { useSubscribed } from '../../hooks/useSubscribed';
import { getArticleById, getSimilarArticlesListData } from '../../queries/articleQueries';
import { load } from '../../utils/load';
import { Article } from '../../firebase/types';
import { OnSnapshotCallback } from '../../firebase/userRepository';
import { DisplayPath } from './DisplayPath';
import { DisplayHeader } from './DisplayHeader';
import { DisplayContent } from './DisplayContent';
import { DisplayVideo } from './DisplayVideo';
import { DisplayRedactor } from './DisplayRedactor';

export const SingleBlogArticle = () => {
    useAuthorization(true);
    const classes = useStyles();
    const { articleId } = useParams<{ articleId: string }>();
    const [similarArticles, setSimilarArticles] = useState<Article[]>();
    const [listeners, setListeners] = useState<(() => void)[]>([]);

    const article = useSubscribed<Article | null>((onSnapshotCallback: OnSnapshotCallback<Article>) =>
        getArticleById(articleId, onSnapshotCallback),
    ) as Article;

    const detachListeners = () => {
        listeners.forEach(listener => () => listener());
    };

    const waitForArticlesData = async () => {
        const { articleList, unsubscribed } = await getSimilarArticlesListData(article, article.category, article.tags);
        if (unsubscribed) {
            setSimilarArticles(articleList);
            setListeners([...listeners, unsubscribed]);
        }
    };
    useEffect(() => {
        load(waitForArticlesData());
        return () => detachListeners();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return article ? (
        <Grid className={classes.rootGrid} container direction="column">
            <Grid container direction="row">
                <DisplayPath
                    category={article.category[0]}
                    title={article.subtitle}
                    readingTime={article.readingTime}
                />
            </Grid>
            <Grid container direction="row">
                <DisplayHeader title={article.title} />
            </Grid>
            <Grid container direction="row">
                <DisplayContent
                    category={article.category}
                    header={article.header}
                    pictureUrl={article.pictureUrl}
                    contentHTML={article.contentHTML}
                />
            </Grid>
            <Grid container direction="row">
                <DisplayVideo videoUrl={article.videoUrl} tags={article.tags} />
            </Grid>
            <Grid container direction="row">
                <DisplayRedactor
                    firstName={article.redactor.firstName}
                    lastName={article.redactor.lastName}
                    avatarUrl={article.redactor.avatarUrl}
                    profession={article.redactor.profession}
                    shortDescription={article.redactor.shortDescription}
                />
            </Grid>
            {similarArticles && <Grid></Grid>}
        </Grid>
    ) : (
        <></>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        typography: {
            fontFamily: 'Montserrat',
        },
        rootGrid: {
            padding: '3.57vw 12.14vw 2.85vw 6.07vw',
        },
    }),
);
