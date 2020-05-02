import React, { useState, useEffect } from 'react';
import { Typography, makeStyles, Grid } from '@material-ui/core';
import { BlogArticleCard } from './BlogArticleCard';
import { CategoryTabs } from './CategoryTabs';
import { StyledPagination } from './Pagination';
import { getArticles } from '../../queries/articleQueries';
// import { useSubscribed } from '../../hooks/useSubscribed';
import { PaginatedArticleList } from '../../firebase/types';


export const BlogMainPage = () => {

    const classes = useStyles();
    const link = '/';

    const [currentCategory, setCurrentCategory] = useState<string>('all');
    const [blogArticles, setBlogArticles] = useState<PaginatedArticleList | null>(null);
    useEffect(() => {
        addArticlesToState(currentCategory);
    }, [currentCategory]);

    const addArticlesToState = (category: string | undefined) => {
        let categoryKey = category;
        if (categoryKey === 'all') {
            categoryKey = undefined;
        }

        getArticles(
            (blogArticlesFromSnapshot: PaginatedArticleList) => {
                setBlogArticles(blogArticlesFromSnapshot);
            },
            categoryKey
        );

    };

    // const changeCategory = (category: string) => {
    //     setCurrentCategory(category);
    //     addArticlesToState(currentCategory);
    // };

    // const paginationQuery = (next: boolean, prev: boolean, category: string) => {
    //     if (!blogArticles) return;
    //     let startAfter;
    //     let endBefore;

    //     if (next) {
    //         startAfter = blogArticles.lastSnap;
    //     }
    //     if (prev) {
    //         endBefore = blogArticles.firstSnap;
    //     }

    //     getArticles(
    //         (blogArticlesFromSnapshot) => {
    //             setBlogArticles(blogArticlesFromSnapshot);
    //         },
    //         category,
    //         startAfter,
    //         endBefore,
    //     );
    // };


    return (
        <div>
            <Typography variant="h4" gutterBottom className={classes.heading}>Tutaj dowiesz się jak zadbać o rozwój swojego dziecka</Typography>
            <CategoryTabs setCategory={setCurrentCategory} />
            <div className={classes.gridBackground}>
                { blogArticles &&
                <Grid container justify="space-around" spacing={2} className={classes.gridContainer}>
                    {blogArticles.articleList.map((article) => (
                        <Grid key={article.title} item className={classes.articleCard} xs={4} zeroMinWidth>
                            <BlogArticleCard title={article.title} image={article.pictureUrl} description={article.description} link={link} />
                        </Grid>
                    ))}
                </Grid> }
                <StyledPagination />
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
