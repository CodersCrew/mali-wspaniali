import React, { useState, useEffect } from 'react';
//import { useParams } from 'react-router-dom';
//import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles, Grid, Theme } from '@material-ui/core';

//import { useAuthorization } from '../../hooks/useAuthorization';
import { getSingleArticleById, getSimilarArticlesListData } from '../../queries/singleArticleQueries';
import { load } from '../../utils/load';
import { Article } from '../../firebase/types';
import { DisplayPath } from './DisplayPath';
import { DisplayHeader } from './DisplayHeader';
import { DisplayContent } from './DisplayContent';
import { DisplayVideo } from './DisplayVideo';
import { DisplayRedactor } from './DisplayRedactor';

export const SingleBlogArticle = () => {
    //useAuthorization(true, '/', ['admin', 'parent']);
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            typography: {
                fontFamily: 'Montserrat',
            },
            rootGrid: {
                padding: '3.57vw 12.14vw 2.85vw 6.07vw',
            },
            similarArtcilesContainer: {},
        }),
    );
    const classes = useStyles();
    //const { t } = useTranslation();
    //const { articleId } = useParams<{ articleId: string }>();
    const [articleId] = useState<string>('KRw6nEGIXsTnAXrpBIqg');
    const [article, setArticle] = useState<Article>();
    const [similarArticles, setSimilarArticles] = useState<Article[]>();
    const [listeners, setListeners] = useState<(() => void)[]>([]);

    const detachListeners = () => {
        listeners.forEach(listener => () => listener());
    };
    const waitForArticlesData = async () => {
        const { article, unsubscribe } = await getSingleArticleById(articleId);
        if (unsubscribe) {
            setArticle(article);
            const { articleList, unsubscribed } = await getSimilarArticlesListData(
                article,
                article.category,
                article.tags,
            );
            if (unsubscribed) {
                setSimilarArticles(articleList);
                setListeners([...listeners, unsubscribe, unsubscribed]);
            }
        }
    };
    useEffect(() => {
        load(waitForArticlesData());
        return () => detachListeners();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return article && similarArticles ? (
        <>
            <Grid className={classes.rootGrid} container direction="column">
                <Grid container direction="row">
                    <DisplayPath
                        category={article.category[0]}
                        title={article.titles[0]}
                        readingTime={article.readingTime}
                    />
                </Grid>
                <Grid container direction="row">
                    <DisplayHeader title={article.titles[1]} />
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
            </Grid>
        </>
    ) : (
        <></>
    );
};
