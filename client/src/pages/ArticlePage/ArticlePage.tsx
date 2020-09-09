import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles, Grid, Theme } from '@material-ui/core';
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
                <div className={classes.articleContentContainer}>
                    <Grid container direction="row">
                        <ArticleContent
                            pictureUrl={data.article.pictureUrl}
                            contentHTML={data.article.contentHTML}
                            title={data.article.title}
                            date={data.article.date}
                            readingTime={data.article.readingTime}
                        />
                    </Grid>
                    <Grid className={classes.videoContainer}>
                        <ArticleVideo videoUrl={data.article.videoUrl} tags={data.article.tags} />
                    </Grid>
                    <Grid container direction="row">
                        <ArticleRedactor redactor={data.article.redactor} />
                    </Grid>
                    <Grid className={classes.paginationButtonsContainer} item md={9} xs={12}>
                        <ButtonDefault variant="contained">{t(`single-article.go-to-previous-page`)}</ButtonDefault>
                        <ButtonDefault variant="contained" color={'secondary'}>
                            {t(`single-article.go-to-next-page`)}
                        </ButtonDefault>
                    </Grid>
                </div>
            </Grid>
        </>
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
            maxWidth: '100vw',
            padding: `${theme.spacing(3)}px`,

            [theme.breakpoints.down('sm')]: {
                width: '100%',
            },
        },
        videoContainer: {
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(4),
        },
        paginationButtonsContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            padding: `${theme.spacing(4)}px 0 ${theme.spacing(4)}px 0 `,
        },
    }),
);
