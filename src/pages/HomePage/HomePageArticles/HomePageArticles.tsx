import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { HomePageArticleItem } from './HomePageArticleItem';
import { textColor } from '../../../colors';
import { Article } from '../../../firebase/types';
import { getArticlesListData } from '../../../queries/articleQuerries';
import { useSubscribed } from '../../../hooks/useSubscribed';
import { OnSnapshotCallback } from '../../../firebase/userRepository';

export const HomePageArticles = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    const articles = useSubscribed<Article[]>(
        (onSnapshotCallback: OnSnapshotCallback<Article[]>) => {
            getArticlesListData(onSnapshotCallback);
        },
        [],
    ) as Article[];

    return <>
        <p className={classes.articleHeader}>{t('home-page-content.recent-news')}</p>
        <div className={classes.articlesList}>
            {articles &&
                    articles.map(article => {
                        const { articleId, title, description, pictureUrl } = article;
                        const ArticlePictureComponent = (
                            <img className={classes.articleImg} alt="mali_wspaniali_img_one" src={pictureUrl} />
                        );
                        return (
                            <div key={article.title}>
                                <HomePageArticleItem
                                    articleId={articleId}
                                    title={title}
                                    description={description}
                                    ArticlePictureComponent={ArticlePictureComponent}
                                />
                            </div>
                        );
                    })}
        </div>
    </>;
};

const useStyles = makeStyles({
    articleHeader: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 21,
        color: textColor,
        margin: '20px 0 20px 0',
    },
    articlesList: {
        display: 'flex',
        marginTop: 30,
    },
    articleImg: {
        borderRadius: '4px',
        position: 'relative',
        top: '-26px',
        maxHeight: '185px',
        maxWidth: '276px',
    },
});
