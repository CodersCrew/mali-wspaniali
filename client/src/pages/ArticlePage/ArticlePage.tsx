import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles, createStyles, Grid, Theme, CardMedia } from '@material-ui/core';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';

import { activePage } from '../../apollo_client';
import { useIsDevice } from '../../queries/useBreakpoints';
import { calculateReadingTime } from '../../utils/calculateReadingTime';
import { useArticleWithId } from '../../operations/queries/Articles/getArticleById';
import { ArticleNavigationMobile } from '../ArticleListPage/ArticleNavigationMobile';
import { ArticleContent } from './ArticleContent';
import { ArticleVideo } from './ArticleVideo';
import { ArticleRedactor } from './ArticleRedactor';
import { ReadingTime } from './ReadingTime';
import { articleStore } from '../AdminUpdateArticlePage/ArticleCreator/ArticleCreatorStore';

export default observer(function ArticlePage() {
    const { articleId } = useParams<{ articleId: string }>();
    const { isMobile, isTablet, isDesktop } = useIsDevice();
    const classes = useStyles();
    const history = useHistory();
    const { article } = useArticleWithId(articleId);

    React.useEffect(() => {
        activePage(['parent-menu.blog']);
    }, [articleId]);

    React.useEffect(() => {
        if (!articleStore.article && article) {
            articleStore.setArticle(article);
        }
    }, [article]);

    function onBackClick() {
        history.goBack();
    }

    if (!article || !articleStore.article) return null;

    return (
        <>
            {isMobile && <ArticleNavigationMobile onClick={onBackClick} />}
            <Grid
                classes={{ root: clsx({ [classes.container]: true, [classes.mobileContainer]: !isDesktop }) }}
                container
            >
                <Grid item xs={12}>
                    <CardMedia
                        classes={{ root: classes.imageContainer }}
                        component="img"
                        image={articleStore.article.pictureUrl}
                    />
                </Grid>
                <Grid item xs={12} lg={10} md={11}>
                    <div
                        className={clsx({
                            [classes.readingTimeContainerMobile]: true,
                            [classes.readingTimeContainerTablet]: isTablet,
                            [classes.readingTimeContainerDesktop]: isDesktop,
                        })}
                    >
                        <ReadingTime
                            date={new Date(articleStore.article.publishedAt || articleStore.article.createdAt)}
                            readingTime={calculateReadingTime(articleStore.article.contentHTML)}
                        />
                    </div>
                    <ArticleContent />
                    <Grid item classes={{ root: classes.videoContainer }}>
                        <ArticleVideo />
                    </Grid>
                </Grid>
                <Grid container xs={12}>
                    <Grid item xs={12} classes={{ root: classes.redactorContainer }}>
                        <ArticleRedactor />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
});

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(3),
        },
        mobileContainer: {
            padding: theme.spacing(2),
        },
        imageContainer: {
            height: 400,
        },
        readingTimeContainerMobile: {
            margin: theme.spacing(3, 0, 2),
        },
        readingTimeContainerTablet: {
            margin: theme.spacing(4, 0, 2),
        },
        readingTimeContainerDesktop: {
            margin: theme.spacing(5, 0, 2),
        },
        videoContainer: {
            margin: `${theme.spacing(4)}px 0`,
        },
        redactorContainer: {
            margin: `${theme.spacing(4)}px 0`,
        },
    }),
);
