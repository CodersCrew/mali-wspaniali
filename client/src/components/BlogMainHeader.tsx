import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { createStyles } from '@material-ui/styles';
import { Theme } from '../theme/types';
import { white, mainColor } from '../colors';

export const BlogMainHeader = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div>
            <div className={classes.titleContainer}>
                <span className={classes.title}>{t('blog-main-page.header-bar')}</span>
            </div>
            <div className={classes.subtitleContainer}>
                <Typography variant="h4" gutterBottom className={classes.subtitle}>
                    {t('blog-main-page.header')}
                </Typography>
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            fontWeight: 'bold',
            color: white,
            fontSize: '21px',
            textTransform: 'uppercase',
        },
        titleContainer: {
            backgroundColor: mainColor,
            borderRadius: '0 0 8px 8px',
            padding: '10px',

            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },

        subtitle: {
            fontWeight: 'bold',
            fontSize: 34,
            zIndex: 10,
            width: '60vw',

            [theme.breakpoints.down('sm')]: {
                fontSize: '15px',
                fontWeight: 'normal',
                textAlign: 'center',
                textTransform: 'uppercase',
            },
        },

        subtitleContainer: {
            display: 'flex',
            marginTop: '20px',
            zIndex: 10,

            [theme.breakpoints.down('sm')]: {
                display: 'flex',
                justifyContent: 'center',
            },
        },
    }),
);
