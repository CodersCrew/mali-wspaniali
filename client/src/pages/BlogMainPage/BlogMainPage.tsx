import React, { useEffect, useState } from 'react';
import { Typography, makeStyles, Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useParams, useHistory } from 'react-router-dom';

import { theme } from '../../theme';
import { BlogArticleCard } from './BlogArticleCard';
import { CategoryTabs } from './CategoryTabs';
import { Pagination } from './Pagination';
import { white } from '../../colors';
import { Article } from '../../graphql/types';
import { categoriesList } from './BlogCategories';
import { getArticles } from '../../queries/articleQueries';
import { DropDownMenu } from './DropDownMenu';
import { BlogMainHeader } from '../../components/BlogMainHeader';

export const BlogMainPage = () => {
    const classes = useStyles();
    const [articles, setArticles] = useState<Article[]>([]);
    const { t } = useTranslation();
    const params = useParams<{ category: string; page: string }>();
    const history = useHistory();
    let currentPage = parseInt(params.page);
    const [currentCategory, setCurrentCategory] = useState<string>('all');

    if (Number.isNaN(currentPage) || currentPage < 1) currentPage = 1;

    useEffect(() => {
        let articles;

        if (params.category === 'all') {
            articles = getArticles(currentPage);
        } else {
            articles = getArticles(currentPage, params.category);
        }

        articles.then(({ data }) => setArticles(data.articles));
    }, [params.category, currentPage]);

    const paginationQuery = (paginationDirection: string) => {
        if (paginationDirection === 'next') {
            history.push(`/parent/blog/${params.category}/${currentPage + 1}`);
        } else {
            history.push(`/parent/blog/${params.category}/${currentPage - 1}`);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.headerBar}>{t('blog-main-page.header-bar')}</div>
            <BlogMainHeader />
            <DropDownMenu setCategory={setCurrentCategory} />
            <CategoryTabs
                values={categoriesList}
                active={params.category}
                onClick={value => history.push(`/parent/blog/${value}/1`)}
            />
            <div className={classes.gridBackground}>
                <Grid container justify="space-around" spacing={6} className={classes.gridContainer}>
                    {articles.slice(0, 6).map((article: Article) => (
                        <Grid key={article.id} item xs={4} zeroMinWidth>
                            <BlogArticleCard
                                title={article.title}
                                image={article.pictureUrl}
                                description={article.description}
                                category={article.category}
                                link={`/parent/article/${article.id}`}
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
        </ThemeProvider>
    );
};

const useStyles = makeStyles({
    headerBar: {
        backgroundColor: mainColor,
        borderRadius: '0 0 8px 8px',
        fontWeight: 'bold',
        padding: '10px',
        color: white,
        fontSize: '21px',
        top: '50px',
        left: 0,
        width: '100vw',
        position: 'absolute',
        textTransform: 'uppercase',

        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },

    gridContainer: {
        maxWidth: '92%',
        margin: '0 4%',

        [theme.breakpoints.down('sm')]: {
            fontSize: 150,
            display: 'flex',
            flexDirection: 'column',
            lineHeight: '18px',
        },
    },
    gridBackground: {
        backgroundColor: white,
        borderRadius: '20px',
    },
    grid: {
        [theme.breakpoints.down('sm')]: {
            minWidth: 'fit-content',
        },
    },
});
