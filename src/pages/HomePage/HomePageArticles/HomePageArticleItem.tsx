/* eslint-disable global-require */
import React from 'react';
import { makeStyles, Button, Icon } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { cardBackgroundColor, activeColor, textColor } from '../../../colors';
import { ArticleProps } from './types';

export const HomePageArticleItem = ( { articleId, title, description, ArticlePictureComponent }: ArticleProps) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Link className={classes.articleLink} to={`/article/${articleId}`}>
            <div className={classes.articleCard}>
                {ArticlePictureComponent}
                <div className={classes.articleInfo}>
                    <span className={classes.articleTitle}>{title}</span>
                    <span className={classes.articleDescription}>{description}</span>
                    <Button
                        variant="contained"
                        className={classes.articleButton}
                        endIcon={<Icon></Icon>}
                    >
                        {t('home-page-content.article-card-btn')}
                    </Button>
                </div>
            </div>
        </Link>
    );
};

const useStyles = makeStyles({
    articleCard: {
        textAlign: 'center',
        padding: '0 15px 15px 15px',
        background: cardBackgroundColor,
        marginRight: 60,
        boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.15)',
        borderRadius: '4px',
        marginTop: 25,
        maxWidth: '306px',
        minHeight: '360px',
        maxHeight: '360px',
        color: textColor,
        position: 'relative',
    },
    articleInfo: {
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '-26px',
        color: textColor,
        overflow: 'hidden',
    },
    articleTitle: {
        marginTop: 6,
        marginBottom: 10,
        fontWeight: 'bold',
        color: textColor,
    },
    articleDescription: {
        wordBreak: 'break-word',
    },
    articleButton: {
        margin: '1px',
        background: activeColor,
        display: 'flex',
        alignSelf: 'flex-end',
        color: '#fff',
        padding: '4px 10px 4px 10px',
        marginTop: 10,
        position: 'absolute',
        bottom: 15,
        right: 15,
    },
    articleButtonIcon: {
        marginRight: 9,
        display: 'flex',
    },
    articleLink: {
        textDecoration: 'none',
        color: '#fff',
    },
});
