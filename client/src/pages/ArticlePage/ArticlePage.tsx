import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles, Grid, Theme } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { ArticleContent, customArticleTheme } from './ArticleContent';
import { ArticleVideo } from './ArticleVideo';
import { ArticleRedactor } from './ArticleRedactor';
import { ArticleNavigationMobile } from '../ArticleListPage/ArticleNavigationMobile';
import { Article } from '../../graphql/types';
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
    const { pictureUrl, date, readingTime, title, description, contentHTML } = data.article;

    return (
        <React.Fragment>
            {device === 'MOBILE' && <ArticleNavigationMobile onClick={onBackClick} />}
            <Grid className={classes.rootGrid} container direction="column">
                <Grid className={classes.articleContentContainer} item xs={12} lg={10}>
                    <ArticleContent
                        pictureUrl={pictureUrl}
                        date={date}
                        readingTime={readingTime}
                        title={title}
                        description={description}
                        contentHTML={contentHTML}
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
                    <ButtonDefault variant="contained" color="secondary">
                        {t(`single-article.go-to-next-page`)}
                    </ButtonDefault>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

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
            padding: theme.spacing(3),

            [theme.breakpoints.down('lg')]: {
                minWidth: '96vw',
            },
            [theme.breakpoints.up('lg')]: {
                minWidth: 0,
                padding: theme.spacing(4),
            },
            [customArticleTheme.breakpoints.down('xs')]: {
                padding: theme.spacing(2),
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
            padding: theme.spacing(1, 3, 3, 3),

            [theme.breakpoints.up('xl')]: {
                paddingTop: theme.spacing(2),
            },
        },
    }),
);
