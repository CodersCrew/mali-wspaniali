import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { createStyles, makeStyles, Theme, Typography, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { ARTICLES } from '../../graphql/articleRepository';
import { BlogArticleCard } from '../../components/Blog/BlogArticleCard';
import { PaginatedArticles } from '../../graphql/types';
import { activePage } from '../../apollo_client';
import { PageContainer } from '../../components/PageContainer';
import { ButtonSecondary } from '../../components/Button/ButtonSecondary';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Blog/Pagination';
import { useIsDevice } from '../../queries/useBreakpoints';

const ARTICLES_PER_PAGE = 6;

export default function AdminArticlesPage() {
    const classes = useStyles();
    const { t } = useTranslation();
    const { isSmallMobile } = useIsDevice();

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
            <Typography className={classes.headerText} variant="h3">
                {t('admin-articles.title')}
            </Typography>
            <Link to="/admin/articles/create" className={classes.link}>
                <ButtonSecondary variant="contained" className={classes.addButton}>
                    <AddIcon className={classes.addIcon} />
                    {t('admin-articles.add-article')}
                </ButtonSecondary>
            </Link>
            <Grid container justify="center" spacing={isSmallMobile ? 2 : 4}>
                {articles.map((article) => (
                    <Grid key={article._id} item xs={12} sm={6} md={4} zeroMinWidth>
                        <BlogArticleCard
                            title={article.title}
                            pictureUrl={article.pictureUrl}
                            description={article.description}
                            link={`/parent/article/${article._id}`}
                            category={t(`single-article.${article.category}`)}
                        />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.paginationContainer}>
                <Pagination
                    count={articles.length}
                    maxCount={count}
                    disabled={!hasNext}
                    hidden={articles.length < ARTICLES_PER_PAGE}
                    onClick={() => {
                        const { scrollY } = window;

                        fetchMore({
                            variables: {
                                page: currentPage + 1,
                                perPage: ARTICLES_PER_PAGE,
                            },
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
        addIcon: {
            marginRight: theme.spacing(1),
        },
        link: {
            textDecoration: 'none',
            position: 'fixed',
            bottom: theme.spacing(3),
            right: theme.spacing(3),
            zIndex: 99,
        },
        addButton: {
            borderRadius: theme.spacing(3),
            padding: theme.spacing(1.5),
        },
        headerText: {
            marginBottom: theme.spacing(3),
        },
        paginationContainer: {
            marginBottom: theme.spacing(3),
        },
    }),
);
