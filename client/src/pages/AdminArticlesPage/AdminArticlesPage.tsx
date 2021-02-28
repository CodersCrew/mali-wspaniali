import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { createStyles, makeStyles, Theme, Typography, Grid, Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { ARTICLES } from '../../graphql/articleRepository';
import { BlogArticleCard } from '../../components/Blog/BlogArticleCard';
import { PaginatedArticles, Article } from '../../graphql/types';
import { activePage } from '../../apollo_client';
import { PageContainer } from '../../components/PageContainer';
import { ButtonSecondary } from '../../components/Button/ButtonSecondary';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Blog/Pagination';

const ARTICLES_PER_PAGE = 6;

export default function AdminArticlesPage() {
    const classes = useStyles();
    const { t } = useTranslation();

    const [currentPage, setCurrentPage] = useState(1);
    const { data, loading, fetchMore } = useQuery<{
        paginatedArticles: PaginatedArticles;
    }>(ARTICLES, {
        variables: {
            page: currentPage,
            perPage: ARTICLES_PER_PAGE,
        },
    });

    useEffect(() => {
        activePage(['admin-menu.articles.title']);
        setCurrentPage(1);
    }, []);

    if (loading && !data) return <Loader />;
    if (!data) return null;

    const { articles, count, hasNext } = data.paginatedArticles;

    return (
        <PageContainer>
            <Box className={classes.wrapper}>
                <Typography variant="h3">{t('admin-articles.title')}</Typography>
                <Link to="/admin/articles/create" className={classes.link}>
                    <ButtonSecondary variant="contained">
                        <AddIcon className={classes.addIcon} />
                        {t('admin-articles.add-article')}
                    </ButtonSecondary>
                </Link>
            </Box>
            <div>
                <Grid container justify="space-around" spacing={6} className={classes.gridContainer}>
                    {articles.map((article: Article) => (
                        <Grid key={article._id} item xs={4} zeroMinWidth>
                            <BlogArticleCard
                                title={article.title}
                                pictureUrl={article.pictureUrl}
                                description={article.description}
                                link={`/admin/article/${article._id}`}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Pagination
                    count={articles.length}
                    maxCount={count}
                    disabled={!hasNext}
                    hidden={articles.length < ARTICLES_PER_PAGE}
                    onClick={() => {
                        const { scrollY } = window;

                        fetchMore({
                            variables: { page: currentPage + 1, perPage: ARTICLES_PER_PAGE },
                            updateQuery: (prev, { fetchMoreResult }) => {
                                setCurrentPage((prevPage) => prevPage + 1);

                                if (!fetchMoreResult) return prev;

                                return {
                                    ...prev,
                                    paginatedArticles: {
                                        ...prev.paginatedArticles,
                                        ...fetchMoreResult!.paginatedArticles,
                                        articles: [
                                            ...prev.paginatedArticles.articles,
                                            ...fetchMoreResult!.paginatedArticles.articles,
                                        ],
                                    },
                                };
                            },
                        }).then(() => {
                            window.scroll(0, scrollY);
                        });
                    }}
                />
            </div>
        </PageContainer>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        innerContainer: {
            padding: theme.spacing(2),
        },
        addIcon: {
            marginRight: theme.spacing(1),
        },
        link: {
            textDecoration: 'none',
        },
        gridContainer: {
            maxWidth: '92%',
            margin: '0 4%',
        },
        container: {
            margin: `0 ${theme.spacing(3)}px`,
        },
    }),
);
