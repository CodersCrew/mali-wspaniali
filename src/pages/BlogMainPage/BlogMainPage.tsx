import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { BlogArticleCard } from './BlogArticleCard';

export const BlogMainPage = () => {

    const classes = useStyles();
    const title = "Tutaj będzie nazwa, która jest przeważnie bardzo długa";
    const image = "https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";
    const description = "Tutaj będzie zwykły tekst ok. do 2 zdań. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the."
    const link = "/"

    return (
        <>
            <Typography variant="h4" gutterBottom className={classes.heading}>Tutaj dowiesz się jak zadbać o rozwój swojego dziecka</Typography>
            <BlogArticleCard title={title} image={image} description={description} link={link} />
        </>
    );

};

const useStyles = makeStyles({
    heading: {
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        fontSize: '34px',
        // marginTop: '48px',
        // marginLeft: '53px',
        // position: 'absolute',
        width: '60%',
        display: 'block'
    },
});
