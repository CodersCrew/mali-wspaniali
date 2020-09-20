import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles, Grid, Theme, createMuiTheme } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { Article } from '../../graphql/types';
import { ArticleContent } from './ArticleContent';
import { ArticleVideo } from './ArticleVideo';
import { ArticleRedactor } from './ArticleRedactor';
import { ArticleNavigationMobile } from '../ArticleListPage/ArticleNavigationMobile';
import { ARTICLE_BY_ID } from '../../graphql/articleRepository';
import { activePage } from '../../apollo_client';
import { useBreakpoints } from '../../queries/useBreakpoints';
import { ButtonDefault } from '../../components/Button';

export const ArticlePage = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { articleId } = useParams<{ articleId: string }>();
    const device = useBreakpoints();
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

    return (
        <>
            {device === 'MOBILE' && <ArticleNavigationMobile onClick={onBackClick} />}
            <Grid className={classes.rootGrid} container direction="column">
                <Grid className={classes.articleContentContainer} item lg={12}>
                    <ArticleContent
                        pictureUrl={data.article.pictureUrl}
                        contentHTML={data.article.contentHTML}
                        title={data.article.title}
                        subtitle={data.article.subtitle}
                        description={data.article.description}
                        header={data.article.header}
                        date={data.article.date}
                        readingTime={data.article.readingTime}
                    />

                    <Grid className={classes.videoContainer}>
                        <ArticleVideo videoUrl={data.article.videoUrl} tags={data.article.tags} />
                    </Grid>
                    <Grid container direction="row" className={classes.mainRedactorWrapper}>
                        <ArticleRedactor redactor={data.article.redactor} />
                    </Grid>
                </Grid>
                <Grid className={classes.paginationButtonsContainer}>
                    <ButtonDefault variant="contained">{t(`single-article.go-to-previous-page`)}</ButtonDefault>
                    <ButtonDefault variant="contained" color={'secondary'}>
                        {t(`single-article.go-to-next-page`)}
                    </ButtonDefault>
                </Grid>
            </Grid>
        </>
    );
};

export const customArticleTheme = createMuiTheme({
    breakpoints: {
        values: {
            xs: 361,
            sm: 768,
            md: 1024,
            lg: 1440,
            xl: 1920,
        },
    },
});

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rootGrid: {
            padding: 0,

            [theme.breakpoints.down('sm')]: {
                overflow: 'hidden',
            },
        },
        articleContentContainer: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: `${theme.spacing(3)}px`,

            [customArticleTheme.breakpoints.down('xs')]: {
                width: '100%',
                padding: `${theme.spacing(2)}px`,
            },
            [customArticleTheme.breakpoints.up('xl')]: {
                width: '100%',
                padding: `${theme.spacing(4)}px`,
            },
        },
        videoContainer: {
            paddingBottom: theme.spacing(4),

            [theme.breakpoints.up('xl')]: {
                paddingBottom: theme.spacing(5),
            },
        },
        mainRedactorWrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        paginationButtonsContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            padding: `${theme.spacing(1)}px ${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,

            [theme.breakpoints.up('xl')]: {
                paddingTop: theme.spacing(2),
            },
        },
    }),
);
