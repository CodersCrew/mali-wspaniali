import React, { useEffect, useState } from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { createStyles } from '@material-ui/styles';
<<<<<<< HEAD
=======
import { useQuery } from '@apollo/client';

>>>>>>> 8a7a7401... add Pagination component
import { CategoryTabs } from './CategoryTabs';
import { categoriesList } from './BlogCategories';
<<<<<<< HEAD
import { BlogMainHeader } from '../../components/BlogMainHeader';
import { Article } from '../../graphql/types';
=======
import { DropDownMenu } from './DropDownMenu';
import { BlogMainHeader } from '../../components/Blog/BlogMainHeader';
import { Article, PaginatedArticles } from '../../graphql/types';
>>>>>>> 8a7a7401... add Pagination component
import { Theme } from '../../theme/types';
import { BlogArticleCard } from '../../components/Blog/BlogArticleCard';
import { activePage } from '../../apollo_client';
import { ARTICLES, ARTICLES_BY_CATEGORY } from '../../graphql/articleRepository';
<<<<<<< HEAD
import { useBreakpoints, Device } from '../../queries/useBreakpoints';
import { CategoryTabsMobile } from './CategoryTabsMobile';
=======
import { Pagination } from '../../components/Blog/Pagination';

const ARTICLES_PER_PAGE = 6;
>>>>>>> 8a7a7401... add Pagination component

export const ArticleListPage = () => {
    const classes = useStyles();
    const params = useParams<{ category: string }>();
    const history = useHistory();
<<<<<<< HEAD
    let currentPage = parseInt(params.page, 10);
    const device = useBreakpoints();
    const { data } = useQuery<{ articles: Article[] }>(params.category === 'all' ? ARTICLES : ARTICLES_BY_CATEGORY, {
        variables: { page: currentPage, category: params.category },
    });

    if (Number.isNaN(currentPage) || currentPage < 1) currentPage = 1;
=======
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
>>>>>>> 8a7a7401... add Pagination component

    useEffect(() => {
        activePage(['parent-menu.blog', `blog-categories.${params.category}`]);
        setCurrentPage(1);
    }, [params.category]);

    if (!data) return null;

<<<<<<< HEAD
    function onTabChange(value: string) {
        history.push(`/parent/blog/${value}/1`);
    }

    const articles = (data && data.articles) || [];

    return (
        <>
            <Navigation onTabChange={onTabChange} category={params.category} device={device} />
            <div className={classes.container}>
                <BlogMainHeader />
                <div className={classes.gridBackground}>
                    <Grid container justify="space-around" spacing={6} className={classes.gridContainer}>
                        {articles.slice(0, 6).map((article: Article) => (
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
                        disabledPrevious={currentPage <= 1}
                        disabledNext={articles.length < 7}
                        handleChange={paginationQuery}
                    />
                </div>
=======
    const { articles, count, hasNext } = data.paginatedArticles;

    return (
        <>
            <BlogMainHeader />
            <div className={classes.dropDownContainer}>
                <DropDownMenu
                    values={categoriesList}
                    active={params.category}
                    onClick={value => history.push(`/parent/blog/${value}`)}
                />
            </div>
            <CategoryTabs
                values={categoriesList}
                active={params.category}
                onClick={value => history.push(`/parent/blog/${value}`)}
            />
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
>>>>>>> 8a7a7401... add Pagination component
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
        navigation: {
            backgroundColor: theme.palette.primary.contrastText,
            padding: `0 ${theme.spacing(3)}px`,
            borderBottom: `1px solid ${theme.palette.grey[400]}`,
        },
    }),
);
