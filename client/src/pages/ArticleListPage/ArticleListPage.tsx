import { useEffect, useState } from 'react';
import { makeStyles, Grid, Typography, createStyles, Theme } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { categoriesList } from './BlogCategories';
import { PaginatedArticles } from '../../graphql/types';
import { BlogArticleCard } from '../../components/Blog/BlogArticleCard';
import { activePage } from '../../apollo_client';
import { ARTICLES, ARTICLES_BY_CATEGORY } from '../../graphql/articleRepository';
import { useIsDevice } from '../../queries/useBreakpoints';
import { Pagination } from '../../components/Blog/Pagination';
import { MobileAwareCategoryTabs } from '../../components/Navigation/MobileAwareCategoryTabs';
import { PageContainer } from '../../components/PageContainer';

const ARTICLES_PER_PAGE = 6;

export default function ArticleListPage() {
    const classes = useStyles();
    const params = useParams<{ category: string }>();
    const history = useHistory();
    const { t } = useTranslation();
    const { isSmallMobile } = useIsDevice();

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
    console.log('DATA', data);

    useEffect(() => {
        activePage([`blog-categories.${params.category}`, 'parent-menu.blog']);
        setCurrentPage(1);
    }, [params.category]);

    function onTabChange(value: string) {
        history.push(`/parent/blog/${value}`);
    }

    if (!data) {
        return (
            <MobileAwareCategoryTabs
                onChange={onTabChange}
                activeCategory={params.category}
                categories={categoriesList}
                name="blog"
            />
        );
    }

    const { articles, count, hasNext } = data.paginatedArticles;

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
