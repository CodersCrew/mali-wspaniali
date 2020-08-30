import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import InfoImage from '../../../../assets/MALWSP_info.png';

export const HomePageInfoHeader = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.headerContainer}>
            <img
                src={InfoImage}
                alt="mali_wspaniali_info"
                className={classes.headerImage}
            />
            <h2 className={classes.headerTitle}>
                {t('home-page-content.foundation-header')}
            </h2>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        headerContainer: {
            [theme.breakpoints.down('md')]: {
                display: 'flex',
                alignItems: 'flex-end',
                marginBottom: 10,
            },
        },
        headerImage: {
            marginRight: 15,

            [theme.breakpoints.down('md')]: {
                maxHeight: 80,
                width: 80,
                objectFit: 'cover',
            },
        },
        headerTitle: {
            margin: 0,
            fontWeight: 'bold',
            fontSize: 14,
            lineHeight: '18px',

            [theme.breakpoints.up('lg')]: {
                display: 'none',
            },
        },
    }),
);
