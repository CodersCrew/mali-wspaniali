import React from 'react';
import { makeStyles } from '@material-ui/core/';
// import { useTranslation } from 'react-i18next';

export interface Article {
    pictureURL: string,
    title: string,
    body: string
}

export const ArticleGrid = (props:{ maliArticles : Article[]}) =>
{
    const classes = useStyles();
    // const { t } = useTranslation();

    return (
        <>
            { props.maliArticles.map((article: Article) => {
                return (
                    <div key={ article.pictureURL } className = {classes.ArticleBox}>
                        <p>{ article.title }</p>
                        <p>{ article.body }</p>
                    </div>
                );
            }) }
        </>
    );
};

const useStyles = makeStyles({
    ArticleBox: {
        borderRadius: '20px',
        backgroundColor: '#f1f2f4',
    },
    ButtonContainedSmallIconLeftPrimaryHover: {
        borderRadius: '4px',
        backgroundColor: '#ff7149',
    }
});