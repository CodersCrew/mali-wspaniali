import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, createStyles, Theme, Grid } from '@material-ui/core';
import { cardBackgroundColor } from '../../../../colors';
import { HomePageInfoHeader } from './HomePageInfoHeader';
import { HomePageInfoContent } from './HomePageInfoContent';
import { HomePageInfoPropTypes } from './types';

export const HomePageInfo = ({ toggleInfoComponent }: HomePageInfoPropTypes) => {
    const [isReadMoreBtnClicked, setIsReadMoreBtnClicked] = useState(false);
    const classes = useStyles();
    const infoRef = useRef<HTMLDivElement>(null);

    const toggleInfoText = () => setIsReadMoreBtnClicked(!isReadMoreBtnClicked);

    useEffect(() => {
        if (infoRef && infoRef.current && isReadMoreBtnClicked) {
            infoRef.current.style.maxHeight = 'none';
        }
        if (infoRef && infoRef.current && !isReadMoreBtnClicked) {
            infoRef.current.style.maxHeight = '200px';
        }
    }, [isReadMoreBtnClicked]);

    return (
        <Grid className={classes.infoContainer} ref={infoRef}>
            <HomePageInfoHeader />
            <HomePageInfoContent
                toggleInfoText={toggleInfoText}
                toggleInfoComponent={toggleInfoComponent}
                setIsReadMoreBtnClicked={isReadMoreBtnClicked}
            />
        </Grid>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        infoContainer: {
            display: 'flex',
            boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.15)',
            borderRadius: '4px',
            background: cardBackgroundColor,
            padding: '20px 14px 15px 15px',
            position: 'relative',
            maxHeight: '163px',

            [theme.breakpoints.down('md')]: {
                marginTop: 30,
                padding: '10px 10px 8px 10px',
                maxHeight: '200px',
                flexDirection: 'column',
                textAlign: 'left',
                overflowY: 'hidden',
            },
        },
    }),
);
