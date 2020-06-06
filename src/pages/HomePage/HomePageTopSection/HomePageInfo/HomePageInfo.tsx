import React, { useState } from 'react';
import { makeStyles, createStyles, Theme, Grid } from '@material-ui/core';
import { cardBackgroundColor } from '../../../../colors';
import { HomePageInfoHeader } from './HomePageInfoHeader';
import { HomePageInfoContent } from './HomePageInfoContent';
import { HomePageInfoPropTypes } from './types';

const smHeight = window.screen.height <= 840 && window.screen.width > 1024;
const mdHeight = window.screen.height < 905 && window.screen.width > 1024;

const infoContainerHeight = smHeight ? '133px' : mdHeight ? '155px' : '200px';
const infoContainerPadding = smHeight
    ? '12px 10px 11px 11px'
    : mdHeight
    ? '15px 14px 15px 15px'
    : '20px 14px 15px 15px';

export const HomePageInfo = ({ toggleInfoComponent }: HomePageInfoPropTypes) => {
    const [isReadMoreBtnClicked, setIsReadMoreBtnClicked] = useState(false);
    const classes = useStyles();

    const toggleInfoText = () => setIsReadMoreBtnClicked(!isReadMoreBtnClicked);

    return (
        <Grid className={`${classes.infoContainer} ${!isReadMoreBtnClicked ? classes.smallInfoContainer : ''}`}>
            <HomePageInfoHeader />
            <HomePageInfoContent
                toggleInfoText={toggleInfoText}
                toggleInfoComponent={toggleInfoComponent}
                isReadMoreBtnClicked={isReadMoreBtnClicked}
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
            padding: infoContainerPadding,
            position: 'relative',
            maxHeight: smHeight ? '133px' : mdHeight ? '155px' : '163px',

            [theme.breakpoints.down('md')]: {
                margin: '30px 30px 0 30px',
                padding: '10px 10px 8px 10px',
                maxHeight: infoContainerHeight,
                flexDirection: 'column',
                textAlign: 'left',
                overflowY: 'hidden',
            },

            [theme.breakpoints.down('xs')]: {
                margin: '30px 0 0 0',
                padding: '10px 10px 8px 10px',
                maxHeight: '200px',
                flexDirection: 'column',
                textAlign: 'left',
                overflowY: 'hidden',
            },
        },
        smallInfoContainer: {
            maxHeight: infoContainerHeight,
        },
    }),
);
