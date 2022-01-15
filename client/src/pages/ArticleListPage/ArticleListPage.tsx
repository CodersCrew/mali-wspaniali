import React from 'react';
import { makeStyles, Grid, Typography, createStyles, Theme } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { categoriesList } from './BlogCategories';
import { BlogArticleCard } from '../../components/Blog/BlogArticleCard';
import { activePage } from '../../apollo_client';
import { useIsDevice } from '../../queries/useBreakpoints';
import { Pagination } from '../../components/Blog/Pagination';
import { MobileAwareCategoryTabs } from '../../components/Navigation/MobileAwareCategoryTabs';
import { PageContainer } from '../../components/PageContainer';
import { ARTICLES_PER_PAGE, useArticles } from '../../operations/queries/Articles/getArticles';

export default function ArticleListPage() {
    const classes = useStyles();
    const params = useParams<{ category: string }>();
    const history = useHistory();
    const { t } = useTranslation();
    const { isSmallMobile } = useIsDevice();

    const [currentPage, setCurrentPage] = React.useState(1);
    const { paginatedArticles, fetchMore } = useArticles(currentPage, params.category);

    React.useEffect(() => {
        activePage([`blog-categories.${params.category}`, 'parent-menu.blog']);
        setCurrentPage(1);
    }, [params.category]);

    function onTabChange(value: string) {
        history.push(`/parent/blog/${value}`);
    }

    if (!paginatedArticles) {
        return (
            <MobileAwareCategoryTabs
                onChange={onTabChange}
                activeCategory={params.category}
                categories={categoriesList}
                name="blog"
            />
        );
    }

    const { articles, count, hasNext } = paginatedArticles;

    return (
        <>
            <MobileAwareCategoryTabs
                onChange={onTabChange}
                activeCategory={params.category}
                categories={categoriesList}
                name="blog"
            />
            <PageContainer>
                <Typography
                    className={clsx({ [classes.headerText]: true, [classes.mobileHeaderText]: isSmallMobile })}
                    variant="h3"
                >
                    {t('blog-main-page.header')}
                </Typography>
                <Grid container justify="flex-start" spacing={isSmallMobile ? 2 : 3}>
                    {articles.map((article) => (
                        <Grid key={article._id} item xs={12} sm={6} md={4} zeroMinWidth>
                            <BlogArticleCard article={article} readOnly />
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
                                    category: params.category,
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
        </>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: `0 ${theme.spacing(3)}px`,
        },
        headerText: {
            marginBottom: theme.spacing(3),
        },
        mobileHeaderText: {
            textAlign: 'center',
        },
        paginationContainer: {
            marginBottom: theme.spacing(3),
        },
    }),
);
