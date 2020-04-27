import React from 'react';
import { Typography, makeStyles, Grid } from '@material-ui/core';
import { BlogArticleCard } from './BlogArticleCard';
import { CategoryTabs } from './CategoryTabs';
import { StyledPagination } from './Pagination';
import { getArticles } from '../../queries/articleQueries';
import { useSubscribed } from '../../hooks/useSubscribed';
import { Article } from '../../firebase/types';
 

export const BlogMainPage = () => {

    const classes = useStyles();
    // const title = "Tutaj będzie nazwa, która jest przeważnie bardzo długa";
    // const image = "https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";
    // const description = "Tutaj będzie zwykły tekst ok. do 2 zdań. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the."
    const link = '/';

    const blogArticles = useSubscribed<Article[]>(getArticles, []) as Article[];

    return (
        <div>
            <Typography variant="h4" gutterBottom className={classes.heading}>Tutaj dowiesz się jak zadbać o rozwój swojego dziecka</Typography>
            <CategoryTabs />

            <div className={classes.gridBackground}>
                <Grid container xs={12} justify="space-around" spacing={2} className={classes.gridContainer}>
                    {blogArticles.map((article) => (
                        <Grid key={article.title} item className={classes.articleCard} xs={4} zeroMinWidth>
                            <BlogArticleCard title={article.title} image={article.pictureUrl} description={article.description} link={link} />
                        </Grid>
                    ))}
                </Grid>
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
