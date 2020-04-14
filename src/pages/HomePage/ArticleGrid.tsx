import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/';
import { load } from '../../utils/load';
import { getArticlesListData } from '../../queries/articleQueries';
import { Article } from '../../firebase/types';


export const ArticleGrid = () =>
{
    const classes = useStyles();
    
    const [articles, setArticles] = useState<Article[]>();


    const waitForArticlesData = async () => {
        const { articleList, unsubscribed } = await getArticlesListData();
        if (articleList.length) {
            setArticles(articleList);
        }
    };

    useEffect(() => {
        load(waitForArticlesData());
    }, []);


    return (
        <>
            {articles && articles.map(article=> <ArticleCard />) }
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