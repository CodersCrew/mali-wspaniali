import React, { useEffect, useState } from 'react';
import { Typography, makeStyles, Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useParams, useHistory } from 'react-router-dom';

import { theme } from '../../theme';
import { BlogArticleCard } from './BlogArticleCard';
import { CategoryTabs } from './CategoryTabs';
import { Pagination } from './Pagination';
import { ArticleCategories } from './types';
import { white } from '../../colors';
import { Article } from '../../firebase/types';
import { categoriesList } from './BlogCategories';
import { getArticles } from '../../queries/articleQueries';

export const BlogMainPage = () => {
    const classes = useStyles();
    const [articles, setArticles] = useState<Article[]>([]);
    const { t } = useTranslation();
    const params = useParams<{ category: string; page: string }>();
    const history = useHistory();
    let currentPage = parseInt(params.page);

    if (Number.isNaN(currentPage)) currentPage = 0;

    useEffect(() => {
        let articles;
        if (params.category === 'all') {
            articles = getArticles(currentPage);
        } else {
            articles = getArticles(currentPage, params.category);
        }

        articles.then(({ data }) => {
            setArticles(data.articles);
        });
    }, [params.category, currentPage]);

    const paginationQuery = (paginationDirection: string) => {
        if (paginationDirection === 'next') {
            history.push(`/parent/blog/category/${params.category}/${currentPage + 1}`);
        } else {
            if (currentPage >= 0) history.push(`/parent/blog/category/${params.category}/${currentPage - 1}`);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Typography variant="h4" gutterBottom className={classes.heading}>
                {t('blog-main-page.header')}
            </Typography>
            <CategoryTabs
                values={categoriesList}
                active={params.category}
                onClick={value => history.push(`/parent/blog/category/${value}/0`)}
            />
            <div className={classes.gridBackground}>
                <Grid container justify="space-around" spacing={6} className={classes.gridContainer}>
                    {articles.slice(0, 6).map((article: Article) => (
                        <Grid key={article.id} item xs={4} zeroMinWidth>
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
                <Pagination isFirst={currentPage === 0} isLast={articles.length < 7} handleChange={paginationQuery} />
            </div>
        </ThemeProvider>
    );
};

const useStyles = makeStyles({
    heading: {
        fontWeight: 'bold',
        fontSize: '34px',
        marginBottom: '4%',
        marginLeft: '3%',
        width: '60%',
        zIndex: 1,
    },
    gridContainer: {
        maxWidth: '92%',
        margin: '0 4%',
    },
    gridBackground: {
        backgroundColor: white,
        borderRadius: '20px',
    },
});
