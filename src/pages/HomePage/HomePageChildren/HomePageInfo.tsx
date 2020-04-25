import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Close } from '@material-ui/icons';
import { makeStyles, createStyles, Theme, Grid } from '@material-ui/core';
import { cardBackgroundColor } from '../../../colors';

const isMobile = window.screen.width < 1024;

export const HomePageInfo = () => {
    const [isClickedReadMore, setIsClikedReadMore] = useState(false);
    const classes = useStyles();
    const { t } = useTranslation();
    const infoRef = useRef<HTMLDivElement>(null);

    const toggleInfoText = () => setIsClikedReadMore(!isClickedReadMore);

    useEffect(() => {
        if (infoRef && infoRef.current && isClickedReadMore) {
            infoRef.current.style.maxHeight = 'none';
        }
        if (infoRef && infoRef.current && !isClickedReadMore && isMobile) {
            infoRef.current.style.maxHeight = '200px';
        }
    }, [isClickedReadMore]);

    const renderInfoButtonText = isClickedReadMore ? 'Zwiń' : 'Czytaj więcej';

    return (
        <div className={classes.infoWrapper} ref={infoRef}>
            <span className={classes.infoHeader}>
                <img
                    src={require('../../../img/mali_wspaniali_info.png')}
                    alt="mali_wspaniali_info"
                    className={classes.infoImage}
                />
                {isMobile ? <p className={classes.infoTitle}>{t('home-page-content.foundation-header')}</p> : null}
            </span>
            <div className={classes.infoContent}>
                <span>
                    <Close className={classes.infoCloseIcon} />
                </span>
                {isMobile ? null : <p className={classes.infoTitle}>{t('home-page-content.foundation-header')}</p>}
                <span>{t('home-page-content.foundation-content')}</span>
            </div>
            {isMobile ? (
                <Grid item xs={4}>
                    <button className={classes.infoReadMore} onClick={() => toggleInfoText()}>
                        {renderInfoButtonText}
                    </button>
                </Grid>
            ) : null}
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        infoWrapper: {
            display: 'flex',
            boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.15)',
            borderRadius: '4px',
            background: cardBackgroundColor,
            padding: '20px 14px 20px 15px',
            position: 'relative',
            maxHeight: '163px',

            [theme.breakpoints.down('sm')]: {
                marginTop: 30,
                padding: '10px 10px 14px 10px',
                maxHeight: '200px',
                flexDirection: 'column',
                textAlign: 'left',
            },
        },
        infoHeader: {
            [theme.breakpoints.down('sm')]: {
                display: 'flex',
                alignItems: 'flex-end',
                marginBottom: 10,
            },
        },
        infoImage: {
            marginRight: 15,

            [theme.breakpoints.down('sm')]: {
                maxHeight: 80,
                width: 80,
                objectFit: 'cover',
            },
        },
        infoTitle: {
            margin: 0,
            fontWeight: 'bold',
            marginBottom: 15,

            [theme.breakpoints.down('sm')]: {
                marginBottom: 0,
            },
        },
        infoContent: {
            overflow: 'hidden',
        },
        infoReadMore: {
            marginTop: 4,
            fontSize: 14,
            outline: 'none',
            background: 'none',
            border: 'none',
            padding: 0,
        },
        infoCloseIcon: {
            width: 14,
            height: 14,
            position: 'absolute',
            top: 14,
            right: 14,
            cursor: 'pointer',

            [theme.breakpoints.down('sm')]: {
                width: 20,
                height: 20,
                top: 10,
                right: 10,
            },
        },
    }),
);
