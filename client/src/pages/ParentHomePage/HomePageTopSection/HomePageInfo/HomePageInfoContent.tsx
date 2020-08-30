import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles, Theme, Grid } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { InfoContentPropTypes } from './types';

export const HomePageInfoContent = ({
    toggleInfoText,
    toggleInfoComponent,
    isReadMoreBtnClicked,
}: InfoContentPropTypes) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const renderInfoButtonText = isReadMoreBtnClicked
        ? t('home-page-content.read-less')
        : t('home-page-content.read-more');

    return (
        <>
            <Grid className={classes.contentContainer}>
                <Close
                    className={classes.contentCloseIcon}
                    onClick={() => toggleInfoComponent()}
                />
                <h2 className={classes.contentTitle}>
                    {t('home-page-content.foundation-header')}
                </h2>
                <p className={classes.contentDescription}>
                    {t('home-page-content.foundation-content')}
                </p>
            </Grid>
            <Grid item xs={4} className={classes.contentButtonWrapper}>
                <button
                    className={classes.contentReadMoreBtn}
                    onClick={() => toggleInfoText()}
                >
                    {renderInfoButtonText}
                </button>
            </Grid>
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contentContainer: {
            overflow: 'hidden',
        },
        contentCloseIcon: {
            width: 14,
            height: 14,
            position: 'absolute',
            top: 14,
            right: 14,
            cursor: 'pointer',

            [theme.breakpoints.down('md')]: {
                width: 20,
                height: 20,
                top: 10,
                right: 10,
            },
        },
        contentTitle: {
            margin: 0,
            fontWeight: 'bold',
            marginBottom: 15,
            fontSize: 15,

            [theme.breakpoints.down('md')]: {
                display: 'none',
            },
        },
        contentDescription: {
            lineHeight: '18px',
            margin: 0,
            height: 90,
            fontSize: 14,

            [theme.breakpoints.down('md')]: {
                marginTop: 0,
                height: 'auto',
            },
        },
        contentButtonWrapper: {
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        contentReadMoreBtn: {
            fontSize: 14,
            outline: 'none',
            background: 'none',
            border: 'none',
            padding: 0,
        },
    }),
);
