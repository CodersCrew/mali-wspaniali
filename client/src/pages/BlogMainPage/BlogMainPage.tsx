import React, { useEffect, useState } from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { createStyles } from '@material-ui/styles';

import { CategoryTabs } from './CategoryTabs';
import { Pagination } from './Pagination';
import { categoriesList } from './BlogCategories';
import { getArticles } from '../../queries/articleQueries';
import { DropDownMenu } from './DropDownMenu';
import { BlogMainHeader } from '../../components/BlogMainHeader';
import { Article } from '../../graphql/types';
import { Theme } from '../../theme/types';
import { BlogArticleCard } from '../../components/BlogArticleCard';

export const BlogMainPage = () => {
    const classes = useStyles();
    const [articles, setArticles] = useState<Article[]>([]);
    const params = useParams<{ category: string; page: string }>();
    const history = useHistory();
    let currentPage = parseInt(params.page, 10);

    if (Number.isNaN(currentPage) || currentPage < 1) currentPage = 1;

    useEffect(() => {
        let fetchedArticles;

        if (params.category === 'all') {
            fetchedArticles = getArticles(currentPage);
        } else {
            fetchedArticles = getArticles(currentPage, params.category);
        }

        fetchedArticles.then(({ data }) => setArticles(data.articles));
    }, [params.category, currentPage]);

    const paginationQuery = (paginationDirection: string) => {
        if (paginationDirection === 'next') {
            history.push(`/parent/blog/${params.category}/${currentPage + 1}`);
        } else {
            history.push(`/parent/blog/${params.category}/${currentPage - 1}`);
        }
    };

    return (
        <>
            <BlogMainHeader />
            <div className={classes.dropDownContainer}>
                <DropDownMenu
                    values={categoriesList}
                    active={params.category}
                    onClick={value => history.push(`/parent/blog/${value}/1`)}
                />
            </div>
            <CategoryTabs
                values={categoriesList}
                active={params.category}
                onClick={value => history.push(`/parent/blog/${value}/1`)}
            />
            <div className={classes.gridBackground}>
                <Grid container justify="space-around" spacing={6} className={classes.gridContainer}>
                    {articles.slice(0, 6).map((article: Article) => (
                        <Grid className={classes.gridSubContainer} key={article.id} item xs={4} zeroMinWidth>
                            <BlogArticleCard
                                header={article.header}
                                title={article.title}
                                pictureUrl={article.pictureUrl}
                                description={article.description}
                                category={article.category}
                                link={`/parent/article/${article.id}`}
                                contentHTML={article.contentHTML}
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
