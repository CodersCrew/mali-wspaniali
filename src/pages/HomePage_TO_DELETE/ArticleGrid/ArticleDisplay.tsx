/* eslint-disable global-require */
import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { cardBackgroundColor, activeColor, textColor } from '../../../colors';

export const ArticleDisplay = (props: { title: string; description: string; articlePicture: string }) => {
    const classes = useStyles();

    return (
        <div className={classes.articleCard}>
            <img
                src={require('../../../img/mali_wspaniali_img_one.png')}
                alt="mali_wspaniali_img_one"
                className={classes.articleImg}
            />
            <div className={classes.articleInfo}>
                <span className={classes.articleTitle}>{props.title}</span>
                <span>{props.description}</span>
                <Button className={classes.articleButton}>
                    <span className={classes.articleButtonIcon}>
                        <img src={require('../../../img/mali_wspaniali_more_btn.svg')} alt="mali_wspaniali_more" />
                    </span>
                    <span>Czytaj dalej</span>
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
        color: textColor,
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
    },
    articleButtonIcon: {
        marginRight: 9,
        display: 'flex',
    },
});
