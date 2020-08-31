import React, { useEffect, useState } from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { createStyles } from '@material-ui/styles';
import { useQuery } from '@apollo/client';

import { CategoryTabs } from './CategoryTabs';
import { categoriesList } from './BlogCategories';
import { BlogMainHeader } from '../../components/Blog/BlogMainHeader';
import { Article, PaginatedArticles } from '../../graphql/types';
import { Theme } from '../../theme/types';
import { BlogArticleCard } from '../../components/Blog/BlogArticleCard';
import { activePage } from '../../apollo_client';
import { ARTICLES, ARTICLES_BY_CATEGORY } from '../../graphql/articleRepository';
import { Pagination } from '../../components/Blog/Pagination';

const ARTICLES_PER_PAGE = 6;

export const ArticleListPage = () => {
    const classes = useStyles();
    const params = useParams<{ category: string }>();
    const history = useHistory();
    const [currentPage, setCurrentPage] = useState(1);
    const { data, fetchMore } = useQuery<{ paginatedArticles: PaginatedArticles }>(
        params.category === 'all' ? ARTICLES : ARTICLES_BY_CATEGORY,
        {
            variables: {
                page: currentPage,
                perPage: ARTICLES_PER_PAGE,
                category: params.category === 'all' ? undefined : params.category,
            },
        },
    );

    useEffect(() => {
        activePage(['parent-menu.blog', `blog-categories.${params.category}`]);
        setCurrentPage(1);
    }, [params.category]);

    if (!data) return null;

    const { articles, count, hasNext } = data.paginatedArticles;

    return (
        <>
            <BlogMainHeader />

            <CategoryTabs
                values={categoriesList}
                active={params.category}
                onClick={value => history.push(`/parent/blog/${value}`)}
            />
            <div className={classes.gridBackground}>
                <Grid container justify="space-around" spacing={6} className={classes.gridContainer}>
                    {articles.map((article: Article) => (
                        <Grid key={article._id} item xs={4} zeroMinWidth>
                            <BlogArticleCard
                                title={article.title}
                                pictureUrl={article.pictureUrl}
                                description={article.description}
                                category={article.category}
                                link={`/parent/article/${article._id}`}
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
                        const scrollY = window.scrollY;

                        fetchMore({
                            variables: { page: currentPage + 1, perPage: ARTICLES_PER_PAGE, category: params.category },
                            updateQuery: (prev, { fetchMoreResult }) => {
                                setCurrentPage(prev => prev + 1);

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
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        gridContainer: {
            maxWidth: '92%',
            margin: '0 4%',
        },
        gridBackground: {
            backgroundColor: theme.palette.primary.contrastText,
            borderRadius: '20px',
        },
    }),
);
