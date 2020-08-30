import React, { useEffect, useState } from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { createStyles } from '@material-ui/styles';
import { useQuery } from '@apollo/client';
import { categoriesList } from './BlogCategories';
import { BlogMainHeader } from '../../components/Blog/BlogMainHeader';
import { Article, PaginatedArticles } from '../../graphql/types';
import { Theme } from '../../theme/types';
import { BlogArticleCard } from '../../components/Blog/BlogArticleCard';
import { activePage } from '../../apollo_client';
import { useBreakpoints } from '../../queries/useBreakpoints';
import {
    ARTICLES,
    ARTICLES_BY_CATEGORY,
} from '../../graphql/articleRepository';
import { Pagination } from '../../components/Blog/Pagination';
import { MobileAwareCategoryTabs } from '../../components/Navigation/MobileAwareCategoryTabs';

const ARTICLES_PER_PAGE = 6;

export const ArticleListPage = () => {
    const classes = useStyles();
    const params = useParams<{ category: string }>();
    const history = useHistory();
    const [currentPage, setCurrentPage] = useState(1);
    const device = useBreakpoints();
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
            <div className={classes.container}>
                <BlogMainHeader />
                <div className={classes.gridBackground}>
                    <Grid
                        container
                        justify="space-around"
                        spacing={6}
                        className={classes.gridContainer}
                    >
                        {articles.map((article: Article) => (
                            <Grid
                                className={classes.gridSubContainer}
                                key={article._id}
                                item
                                xs={4}
                                zeroMinWidth
                            >
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
                            const { scrollY } = window;

                            fetchMore({
                                variables: {
                                    page: currentPage + 1,
                                    perPage: ARTICLES_PER_PAGE,
                                    category: params.category,
                                },
                                updateQuery: (
                                    previousArticlesState,
                                    { fetchMoreResult },
                                ) => {
                                    setCurrentPage((prev) => prev + 1);

                                    if (!fetchMoreResult)
                                        return previousArticlesState;

                                    return {
                                        ...previousArticlesState,
                                        paginatedArticles: {
                                            ...previousArticlesState.paginatedArticles,
                                            ...fetchMoreResult!
                                                .paginatedArticles,
                                            articles: [
                                                ...previousArticlesState
                                                    .paginatedArticles.articles,
                                                ...fetchMoreResult!
                                                    .paginatedArticles.articles,
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
            </div>
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dropDownContainer: {
            margin: `0 ${theme.spacing(7)}px`,
        },
        gridContainer: {
            maxWidth: '92%',
            margin: '0 4%',

            [theme.breakpoints.down('sm')]: {
                display: 'flex',
                flexDirection: 'column',
                lineHeight: theme.typography.subtitle2.lineHeight,
            },
        },
        gridSubContainer: {
            [theme.breakpoints.down('sm')]: {
                minWidth: 'fit-content',
            },
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
