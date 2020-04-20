import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { cardBackgroundColor, activeColor, textColor } from '../../../colors';
import { ArticleProps } from './types';

export const HomePageArticleItem = ({ title, description, articlePicture }: ArticleProps) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.articleCard}>
            <img
                src={require('../../../img/mali_wspaniali_img_one.png')}
                alt="mali_wspaniali_img_one"
                className={classes.articleImg}
            />
            <div className={classes.articleInfo}>
                <span className={classes.articleTitle}>{title}</span>
                <span className={classes.articleDescription}>{description}</span>
                <Button className={classes.articleButton}>
                    <span className={classes.articleButtonIcon}>
                        <img src={require('../../../img/mali_wspaniali_more_btn.svg')} alt="mali_wspaniali_more" />
                    </span>
                    <span>{ t('home-page-content.article-card-btn') }</span>
                </Button>
            </div>
        </div>
    );
};

const useStyles = makeStyles({
    articleImg: {
        borderRadius: '4px',
        position: 'relative',
        top: '-26px',
    },
    articleCard: {
        textAlign: 'center',
        padding: '0 15px 15px 15px',
        background: cardBackgroundColor,
        marginRight: 60,
        boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.15)',
        borderRadius: '4px',
        marginTop: 26,
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
        padding: '4px 10px 4px 10px',
        background: activeColor,
        borderRadius: '4px',
        textTransform: 'uppercase',
        color: '#fff',
        fontSize: '13px',
        display: 'flex',
        alignSelf: 'flex-end',
        marginTop: 10,
        position: 'absolute',
        bottom: 15,
        right: 15,
    },
    articleButtonIcon: {
        marginRight: 9,
        display: 'flex',
    },
});
