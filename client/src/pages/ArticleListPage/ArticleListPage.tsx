import React, { useEffect } from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { createStyles } from '@material-ui/styles';
import { CategoryTabs } from './CategoryTabs';
import { Pagination } from './Pagination';
import { categoriesList } from './BlogCategories';
import { BlogMainHeader } from '../../components/BlogMainHeader';
import { Article } from '../../graphql/types';
import { Theme } from '../../theme/types';
import { BlogArticleCard } from '../../components/BlogArticleCard';
import { activePage } from '../../apollo_client';
import { useQuery } from '@apollo/client';
import { ARTICLES, ARTICLES_BY_CATEGORY } from '../../graphql/articleRepository';
import { useBreakpoints, Device } from '../../queries/useBreakpoints';
import { CategoryTabsMobile } from './CategoryTabsMobile';

export const ArticleListPage = () => {
    const classes = useStyles();
    const params = useParams<{ category: string; page: string }>();
    const history = useHistory();
    let currentPage = parseInt(params.page, 10);
    const device = useBreakpoints();
    const { data } = useQuery<{ articles: Article[] }>(params.category === 'all' ? ARTICLES : ARTICLES_BY_CATEGORY, {
        variables: { page: currentPage, category: params.category },
    });

    if (Number.isNaN(currentPage) || currentPage < 1) currentPage = 1;

    useEffect(() => {
        activePage(['parent-menu.blog', `blog-categories.${params.category}`]);
    }, [params.category]);

    const paginationQuery = (paginationDirection: string) => {
        if (paginationDirection === 'next') {
            history.push(`/parent/blog/${params.category}/${currentPage + 1}`);
        } else {
            history.push(`/parent/blog/${params.category}/${currentPage - 1}`);
        }
    };

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
