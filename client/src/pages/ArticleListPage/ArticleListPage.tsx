import React, { useEffect, useState } from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { createStyles } from '@material-ui/styles';
import { useQuery } from '@apollo/client';

import { categoriesList } from './BlogCategories';
import { Article, PaginatedArticles } from '../../graphql/types';
import { Theme } from '../../theme/types';
import { BlogArticleCard } from '../../components/Blog/BlogArticleCard';
import { activePage } from '../../apollo_client';
import { ARTICLES, ARTICLES_BY_CATEGORY } from '../../graphql/articleRepository';
import { useBreakpoints } from '../../queries/useBreakpoints';
import { Pagination } from '../../components/Blog/Pagination';
import { MobileAwareCategoryTabs } from '../../components/Navigation/MobileAwareCategoryTabs';

const ARTICLES_PER_PAGE = 6;

export function ArticleListPage() {
    const classes = useStyles();
    const params = useParams<{ category: string }>();
    const history = useHistory();
    const device = useBreakpoints();

    const [currentPage, setCurrentPage] = useState(1);
    const { data, fetchMore } = useQuery<{
        paginatedArticles: PaginatedArticles;
    }>(params.category === 'all' ? ARTICLES : ARTICLES_BY_CATEGORY, {
        variables: {
            page: currentPage,
            perPage: ARTICLES_PER_PAGE,
            category: params.category === 'all' ? undefined : params.category,
        },
    });

    useEffect(() => {
        activePage([`blog-categories.${params.category}`, 'parent-menu.blog']);
        setCurrentPage(1);
    }, [params.category]);

    function onTabChange(value: string) {
        history.push(`/parent/blog/${value}`);
    }

    if (!data)
        return (
            <MobileAwareCategoryTabs
                onTabChange={onTabChange}
                category={params.category}
                values={categoriesList}
                device={device}
            />
        );

    const { articles, count, hasNext } = data.paginatedArticles;

    return (
        <>
            <MobileAwareCategoryTabs
                onTabChange={onTabChange}
                category={params.category}
                values={categoriesList}
                device={device}
            />
            <div className={classes.gridBackground}>
                <Grid container justify="space-around" spacing={6} className={classes.gridContainer}>
                    {articles.map((article: Article) => (
                        <Grid key={article._id} item xs={4} zeroMinWidth>
                            <BlogArticleCard
                                title={article.title}
                                pictureUrl={article.pictureUrl}
                                description={article.description}
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
                        const { scrollY } = window;

                        fetchMore({
                            variables: { page: currentPage + 1, perPage: ARTICLES_PER_PAGE, category: params.category },
                            updateQuery: (prev, { fetchMoreResult }) => {
                                setCurrentPage(prevPage => prevPage + 1);

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
}

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
        container: {
            margin: `0 ${theme.spacing(3)}px`,
        },
    }),
);
