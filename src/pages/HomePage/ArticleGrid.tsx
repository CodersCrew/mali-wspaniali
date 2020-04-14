import React, { useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/core/';
import { load } from '../../utils/load';
import { getArticlesListData } from '../../queries/articleQueries';
import { Article } from '../../firebase/types';


export const ArticleGrid = () =>
{
    const [articles, setArticles] = useState<Article[]>();
    const [listeners, setListeners] = useState<(() => void)[]>([]);

    const waitForArticlesData = async () => {
        const { articleList, unsubscribed } = await getArticlesListData();
        if (unsubscribed) {
            setArticles(articleList);
            setListeners([...listeners, unsubscribed]);
        }
    };

    const detachListeners = () => {
        listeners.forEach(listener => () => listener());
    };

    useEffect(() => {
        load(waitForArticlesData());
        return () => detachListeners();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <>
            { articles && articles.map(article => <div key={ article.title }>
                {article.description}
            </div>) }
        </>
    );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* const useStyles = makeStyles({
    ArticleBox: {
        borderRadius: '20px',
        backgroundColor: '#f1f2f4',
    },
    ButtonContainedSmallIconLeftPrimaryHover: {
        borderRadius: '4px',
        backgroundColor: '#ff7149',
    }
}); */