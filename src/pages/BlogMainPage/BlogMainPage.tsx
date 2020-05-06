import React, { useState, useEffect } from 'react';
import { Typography, makeStyles, Grid } from '@material-ui/core';
import { BlogArticleCard } from './BlogArticleCard';
import { CategoryTabs } from './CategoryTabs';
import { Pagination } from './Pagination';
import { getArticles } from '../../queries/articleQueries';
import { PaginatedArticleList, Snapshot } from '../../firebase/types';

export const BlogMainPage = () => {

    const classes = useStyles();
    const link = '/';

    const [currentCategory, setCurrentCategory] = useState<string>('all');
    const [blogArticles, setBlogArticles] = useState<PaginatedArticleList | null>(null);
    const [isLastPage, setIsLastPage] = useState(false);
    const [isFirstPage, setIsFirstPage] = useState(true);

    useEffect(() => {
        addArticlesToState(currentCategory);
    }, [currentCategory]);

    const addArticlesToState = (categoryKey: string | undefined, startAfter?: Snapshot, endBefore?: Snapshot) => {
        const category = categoryKey === 'all' ? undefined : categoryKey;

        getArticles(
            (blogArticlesFromSnapshot) => {
                setBlogArticles(blogArticlesFromSnapshot);
                setupPagination(blogArticlesFromSnapshot);
                if (startAfter || endBefore) {
                    changePagination(blogArticlesFromSnapshot, startAfter, endBefore);
                }
            },
            category,
            startAfter,
            endBefore,
        );
    };

    const setupPagination = (blogArticlesFromSnapshot: PaginatedArticleList) => {
        if (!blogArticlesFromSnapshot.isMore) {
            setIsLastPage(true);
        }
    };

    const changePagination = (blogArticlesFromSnapshot: any, startAfter?: Snapshot, endBefore?: Snapshot) => {
        setIsLastPage(false);
        if (!blogArticlesFromSnapshot.isMore && startAfter) {
            setIsLastPage(true);
        }
        setIsFirstPage(false);
        if (!blogArticlesFromSnapshot.isMore && endBefore) {
            setIsFirstPage(true);
        }
    };

    const paginationQuery = (paginationDirection: string) => {
        if (!blogArticles) return;

        const startAfter = paginationDirection === 'next' ? blogArticles.lastSnap : undefined;
        const endBefore = paginationDirection === 'prev' ? blogArticles.firstSnap : undefined;

        addArticlesToState(currentCategory, startAfter, endBefore);
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom className={classes.heading}>Tutaj dowiesz się jak zadbać o rozwój swojego dziecka</Typography>
            <CategoryTabs setCategory={setCurrentCategory} />
            <div className={classes.gridBackground}>
                {blogArticles &&
                    <Grid container justify="space-around" spacing={2} className={classes.gridContainer}>
                        {blogArticles.articleList.map((article) => (
                            <Grid key={article.title} item className={classes.articleCard} xs={4} zeroMinWidth>
                                <BlogArticleCard title={article.title} image={article.pictureUrl} description={article.description} link={link} />
                            </Grid>
                        ))}
                    </Grid>}
                <Pagination isFirst={isFirstPage} isLast={isLastPage} handleChange={paginationQuery} />
            </div>

        </div>
    );
};

const useStyles = makeStyles({
    heading: {
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        fontSize: '34px',
        paddingTop: '4%',
        marginBottom: '4%',
        marginLeft: '3%',
        width: '60%',
        display: 'block'
    },
    gridContainer: {
        maxWidth: '94%',
        marginTop: '0',
        marginLeft: '3%',
        marginRight: '3%'
    },
    articleCard: {

    },
    gridBackground: {
        backgroundColor: 'white',
        borderRadius: '20px'
    },
});
