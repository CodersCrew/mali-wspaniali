import React, { useState, useEffect } from 'react';
import { Typography, makeStyles, Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { theme } from '../../theme';
import { BlogArticleCard } from './BlogArticleCard';
import { CategoryTabs } from './CategoryTabs';
import { Pagination } from './Pagination';
import { getArticles } from '../../queries/articleQueries';
import { PaginatedArticleList, Snapshot } from '../../firebase/types';
import { ArticleCategories } from './types';
import { white } from '../../colors';

export const BlogMainPage = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [currentCategory, setCurrentCategory] = useState<string>('all');
    const [blogArticles, setBlogArticles] = useState<PaginatedArticleList | null>(null);
    const [isLastPage, setIsLastPage] = useState(false);
    const [isFirstPage, setIsFirstPage] = useState(true);



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
        if (!blogArticles) return;
        const startAfter = paginationDirection === 'next' ? blogArticles.lastSnap : undefined;
        const endBefore = paginationDirection === 'prev' ? blogArticles.firstSnap : undefined;
        addArticlesToState(currentCategory, startAfter, endBefore);
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
                {blogArticles && (
                    <Grid container justify="space-around" spacing={6} className={classes.gridContainer}>
                        {blogArticles.articleList.map(article => (
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
                )}
                <Pagination isFirst={isFirstPage} isLast={isLastPage} handleChange={paginationQuery} />
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
