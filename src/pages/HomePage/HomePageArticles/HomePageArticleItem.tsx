import React from 'react';
import { makeStyles, createStyles, Theme, Button, Grid, Icon } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { cardBackgroundColor, secondaryColor, textColor } from '../../../colors';
import { ArticlePropTypes } from './types';

export const HomePageArticleItem = ({ articleId, title, description, ArticlePictureComponent }: ArticlePropTypes) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Grid className={classes.articleCard}>
            {ArticlePictureComponent}
            <div className={classes.articleInfo}>
                <h2 className={classes.articleTitle}>{title}</h2>
                <p className={classes.articleDescription}>{description}</p>
                <Link className={classes.articleLink} to={`/article/${articleId}`}>
                    <Button variant="contained" className={classes.articleButton} startIcon={<Icon>send</Icon>}>
                        {t('home-page-content.read-more')}
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
            minWidth: '306px',
            maxWidth: '306px',
            minHeight: '360px',
            maxHeight: '360px',
            color: textColor,
            position: 'relative',

            [theme.breakpoints.down('sm')]: {
                minWidth: '270px',
                maxWidth: '270px',
                minHeight: '340px',
                maxHeight: '340px',
                marginRight: 40,
            },

            [theme.breakpoints.down('xs')]: {
                margin: '42px 0 0 0',
                minWidth: 'calc(100vw - 20px)',
                maxWidth: 'calc(100vw - 20px)',
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
            fontSize: 14,
        },
        articleDescription: {
            wordBreak: 'break-word',
            lineHeight: '18px',
        },
        articleButton: {
            padding: '4px 10px 4px 10px',
            background: secondaryColor,
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
        articleLink: {
            textDecoration: 'none',
            color: '#fff',
        },
    }),
);
