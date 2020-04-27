import React from 'react';
import { Typography, makeStyles, Grid } from '@material-ui/core';
import { BlogArticleCard } from './BlogArticleCard';
import { CategoryTabs } from './CategoryTabs';

export const BlogMainPage = () => {

    const classes = useStyles();
    const title = "Tutaj będzie nazwa, która jest przeważnie bardzo długa";
    const image = "https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";
    const description = "Tutaj będzie zwykły tekst ok. do 2 zdań. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the."
    const link = "/"


    return (
        <div>
            <Typography variant="h4" gutterBottom className={classes.heading}>Tutaj dowiesz się jak zadbać o rozwój swojego dziecka</Typography>
            <CategoryTabs />

            <div className={classes.gridBackground}>
                <Grid container xs={12} justify="space-around" spacing={2} className={classes.gridContainer}>
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                        <Grid key={value} item className={classes.articleCard} xs={4} zeroMinWidth>
                            <BlogArticleCard title={title} image={image} description={description} link={link} />
                        </Grid>
                    ))}
                </Grid>
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
