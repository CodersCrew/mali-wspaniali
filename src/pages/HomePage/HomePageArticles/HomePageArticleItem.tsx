/* eslint-disable global-require */
import React from 'react';
import { makeStyles, createStyles, Theme, Button, Grid, Icon } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { cardBackgroundColor, activeColor, textColor } from '../../../colors';
import { ArticleProps } from './types';

export const HomePageArticleItem = ({ articleId, title, description, ArticlePictureComponent }: ArticleProps) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Grid className={classes.articleCard}>
            {ArticlePictureComponent}
            <div className={classes.articleInfo}>
                <span className={classes.articleTitle}>{title}</span>
                <p className={classes.articleDescription}>{description}</p>
                <Link className={classes.articleLink} to={`/article/${articleId}`}>
                    <Button variant="contained" className={classes.articleButton} startIcon={<Icon>send</Icon>}>
                        {t('home-page-content.article-card-btn')}
                    </Button>
                </Link>
            </div>
        </Grid>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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

            [theme.breakpoints.down('sm')]: {
                margin: '42px 0 0 0',
                width: 'auto',
                maxWidth: 'none',
                minHeight: '330px',
                maxHeight: '330px',
            },
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
            lineHeight: '18px',
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
        articleLink: {
            textDecoration: 'none',
            color: '#fff',
        },
    }),
);
