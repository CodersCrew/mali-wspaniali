import React, { useEffect, useState } from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { createStyles } from '@material-ui/styles';
import { useQuery } from '@apollo/client';

import { CategoryTabs } from './CategoryTabs';
import { categoriesList } from './BlogCategories';
import { Article, PaginatedArticles } from '../../graphql/types';
import { Theme } from '../../theme/types';
import { BlogArticleCard } from '../../components/Blog/BlogArticleCard';
import { activePage } from '../../apollo_client';
import { ARTICLES, ARTICLES_BY_CATEGORY } from '../../graphql/articleRepository';
import { useBreakpoints, Device } from '../../queries/useBreakpoints';
import { CategoryTabsMobile } from './CategoryTabsMobile';
import { Pagination } from '../../components/Blog/Pagination';

const ARTICLES_PER_PAGE = 6;

export const ArticleListPage = () => {
    const classes = useStyles();
    const params = useParams<{ category: string }>();
    const history = useHistory();
    const device = useBreakpoints();

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

    function onTabChange(value: string) {
        history.push(`/parent/blog/${value}`);
    }

    const { articles, count, hasNext } = data.paginatedArticles;

    return (
        <>
            <Navigation onTabChange={onTabChange} category={params.category} device={device} />
            <div className={classes.gridBackground}>
                <Grid container justify="space-around" spacing={6} className={classes.gridContainer}>
                    {articles.map((article: Article) => (
                        <Grid className={classes.gridSubContainer} key={article._id} item xs={4} zeroMinWidth>
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
};

interface NavigationProps {
    device: Device;
    category: string;
    onTabChange: (value: string) => void;
}

function Navigation({ device, category, onTabChange }: NavigationProps) {
    const classes = useStyles();

    return (
        <>
            {device === 'MOBILE' ? (
                <CategoryTabsMobile values={categoriesList} active={category} onClick={onTabChange} />
            ) : (
                <div className={classes.navigation}>
                    <CategoryTabs values={categoriesList} active={category} onClick={onTabChange} />
                </div>
            )}
        </>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
        navigation: {
            backgroundColor: theme.palette.primary.contrastText,
            padding: `0 ${theme.spacing(3)}px`,
            borderBottom: `1px solid ${theme.palette.grey[400]}`,
        },
    }),
);
