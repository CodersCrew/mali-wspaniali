import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { load } from '../../../utils/load';
import { getArticlesListData } from '../../../queries/articleQueries';
import { Article } from '../../../firebase/types';
import { ArticleDisplay } from './ArticleDisplay';

export interface Article {
    pictureURL: string,
    title: string,
    body: string
}

export const ArticleGrid = (props:{ maliArticles : Article[]}) =>
{
    const [articles, setArticles] = useState<Article[]>();
    const [listeners, setListeners] = useState<(() => void)[]>([]);
    const classes = useStyles();
    const { t } = useTranslation();

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
        <><p className={ classes.ArticleBoxTitle }>{ t('Najnowsze ARTYKUŁY') }</p>
            <div className={ classes.ArticleList }>
                { articles && articles.map(article => <div key={ article.title }>
                    <ArticleDisplay description={ article.description } articlePicture={ article.pictureUrl }/>
                </div>) }
            </div>
        </>
    );
};


const useStyles = makeStyles({

    ArticleBoxTitle: {
        fontFamily: 'Montserrat',
        fontSize: '21px',
        color: '#1d1d1b',
    },

    ArticleList: {
        display: 'flex',
        flexDirection: 'row'
    },

    ArticleBox: {
        borderRadius: '20px',
        backgroundColor: '#f1f2f4',
    },
});
