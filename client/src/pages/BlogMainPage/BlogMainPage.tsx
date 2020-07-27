import React, { useState } from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { createStyles } from '@material-ui/styles';

import { CategoryTabs } from './CategoryTabs';
import { categoriesList } from './BlogCategories';
import { useBlogPage } from '../../queries/articleQueries';
import { DropDownMenu } from './DropDownMenu';
import { BlogMainHeader } from '../../components/BlogMainHeader';
import { Article } from '../../graphql/types';
import { Theme } from '../../theme/types';
import { BlogArticleCard } from '../../components/BlogArticleCard';
import { Pagination } from '../../components/Pagination';

export const BlogMainPage = () => {
    const classes = useStyles();
    const [currentPage, setCurrentPage] = useState(1);
    const params = useParams<{ category: string; page: string }>();
    const history = useHistory();

    const { data, fetchMore } = useBlogPage();

    if (!data) return null;

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
                    {data.paginatedArticles.articles.map((article: Article) => (
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
                    count={data.paginatedArticles.articles.length}
                    maxCount={data.paginatedArticles.count}
                    disabled={!data.paginatedArticles.hasNext}
                    hidden={data.paginatedArticles.count < 6}
                    onClick={() => {
                        const scrollY = window.scrollY;

                        fetchMore({
                            variables: { page: currentPage + 1 },
                            updateQuery: (prev, { fetchMoreResult }) => {
                                setCurrentPage(prev => prev + 1);

                                return {
                                    ...prev,
                                    paginatedArticles: {
                                        ...prev.paginatedArticles,
                                        ...fetchMoreResult.paginatedArticles,
                                        articles: [
                                            ...prev.paginatedArticles.articles,
                                            ...fetchMoreResult.paginatedArticles.articles,
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
    }),
);
