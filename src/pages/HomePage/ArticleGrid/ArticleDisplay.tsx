import React from 'react';
import { makeStyles } from '@material-ui/core';

export const ArticleDisplay= (props: {description : string, articlePicture: string }) =>
{
    const classes = useStyles(props);

    return (
        <div className={ classes.articleRectangle }>
            <div className={ classes.bg }></div>
            <div className={ classes.articlrDescription }>{ props.description }</div>
        </div>
    );
};

const useStyles = makeStyles({
    bg: (props: {description : string, articlePicture: string }) => ({
        articlePicture: `url(${props.articlePicture})`,
        width: '276px',
        height: '185px',
        borderRadius: '4px'
    }),
    articleRectangle: {
        display: 'flex',
        width: '306px',
  		height: '360px',
        borderRadius: '4px',
  		boxShadow: '1px 1px 4px 0 rgba(0, 0, 0, 0.15)',
  		backgroundColor: '#ffffff',
    },
    articlrDescription: {
        fontFamily: 'Montserrat',
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#1d1d1b',
        textAlign: 'center'
    }
});