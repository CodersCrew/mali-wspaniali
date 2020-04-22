import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { BlogArticleCard } from './BlogArticleCard';

export const BlogMainPage = () => {

    const classes = useStyles();

    return (
        <>
            <Typography variant="h4" gutterBottom className={classes.heading}>Tutaj dowiesz się jak zadbać o rozwój swojego dziecka</Typography>
            <BlogArticleCard/>
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
