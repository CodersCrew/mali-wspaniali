import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles, Grid, Theme, CardMedia, Divider } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import { ArticleContent } from './ArticleContent';
import { ArticleVideo } from './ArticleVideo';
import { ArticleRedactor } from './ArticleRedactor';
import { ArticleNavigationMobile } from '../ArticleListPage/ArticleNavigationMobile';
import { Article } from '../../graphql/types';
import { ARTICLE_BY_ID } from '../../graphql/articleRepository';
import { activePage } from '../../apollo_client';
import { useIsDevice } from '../../queries/useBreakpoints';
import { ButtonDefault } from '../../components/Button';
import { ReadingTime } from './ReadingTime';
import { TagList } from './TagList';

export const ArticlePage = () => {
    const { t } = useTranslation();
    const { articleId } = useParams<{ articleId: string }>();
    const { isMobile, isTablet, isDesktop } = useIsDevice();
    const classes = useStyles();
    const history = useHistory();
    const { data } = useQuery<{ article: Article }>(ARTICLE_BY_ID, {
        variables: { articleId },
    });

    useEffect(() => {
        activePage(['parent-menu.blog']);
    }, [articleId]);

    function onBackClick() {
        history.goBack();
    }

    if (!data || !data.article) return null;

    const { pictureUrl, date, readingTime, title, description, contentHTML, tags, videoUrl, redactor } = data.article;

    return (
        <>
            {isMobile && <ArticleNavigationMobile onClick={onBackClick} />}
            <Grid
                classes={{ root: clsx({ [classes.container]: true, [classes.mobileContainer]: !isDesktop }) }}
                container
                direction="column"
            >
                <CardMedia classes={{ root: classes.imageContainer }} component="img" image={pictureUrl} />
                <Grid item xs={12} lg={10} md={11}>
                    <div
                        className={clsx({
                            [classes.readingTimeContainerMobile]: true,
                            [classes.readingTimeContainerTablet]: isTablet,
                            [classes.readingTimeContainerDesktop]: isDesktop,
                        })}
                    >
                        <ReadingTime date={new Date(date)} readingTime={readingTime} />
                    </div>
                    <ArticleContent title={title} description={description} contentHTML={contentHTML} />
                    <Grid item classes={{ root: classes.videoContainer }}>
                        <ArticleVideo videoUrl={videoUrl} />
                    </Grid>
                    <Grid item classes={{ root: classes.tagContainer }}>
                        <TagList tags={tags} />
                    </Grid>
                </Grid>
                <Grid container xs={12}>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} classes={{ root: classes.redactorContainer }}>
                        <ArticleRedactor redactor={redactor} />
                    </Grid>
                </Grid>
                <Grid container xs={12} justify="space-between">
                    <Grid item>
                        <ButtonDefault variant="contained">{t(`single-article.go-to-previous-page`)}</ButtonDefault>
                    </Grid>
                    <Grid item>
                        <ButtonDefault variant="contained" color="secondary">
                            {t(`single-article.go-to-next-page`)}
                        </ButtonDefault>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

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
        tagContainer: {
            marginBottom: theme.spacing(4),
        },
        redactorContainer: {
            margin: `${theme.spacing(4)}px 0`,
        },
    }),
);
