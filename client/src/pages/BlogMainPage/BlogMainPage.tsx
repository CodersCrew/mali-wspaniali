import React, { useState, useEffect } from 'react';
import { makeStyles, Grid, ThemeProvider } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useParams, useHistory } from 'react-router-dom';

import { theme } from '../../theme';
import { BlogArticleCard } from './BlogArticleCard';
import { CategoryTabs } from './CategoryTabs';
import { Pagination } from './Pagination';
import { getArticles } from '../../queries/articleQueries';
import { PaginatedArticleList, Snapshot } from '../../firebase/types';
import { ArticleCategories } from './types';
import { white, mainColor } from '../../colors';
import { DropDownMenu } from './DropDownMenu';
import { BlogMainHeader } from '../../components/BlogMainHeader';

export const BlogMainPage = () => {
    const classes = useStyles();
    const [articles, setArticles] = useState<Article[]>([]);
    const { t } = useTranslation();
    const params = useParams<{ category: string; page: string }>();
    const history = useHistory();
    let currentPage = parseInt(params.page);

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

            <CategoryTabs setCategory={setCurrentCategory} />

            <div className={classes.gridBackground}>
                {blogArticles && (
                    <Grid container justify="space-around" spacing={6} className={classes.gridContainer}>
                        {blogArticles.articleList.map(article => (
                            <Grid className={classes.grid} key={article.id} item xs={4} zeroMinWidth>
                                <BlogArticleCard
                                    title={article.title}
                                    image={article.pictureUrl}
                                    description={article.description}
                                    link={`/parent/article/${article.id}`}
                                    category={article.category[0] as ArticleCategories}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
                <Pagination isFirst={isFirstPage} isLast={isLastPage} handleChange={paginationQuery} />
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
