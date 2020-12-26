import React, { useState } from 'react';
import { makeStyles, createStyles, Theme, Grid } from '@material-ui/core';
import { cardBackgroundColor } from '../../../../colors';
import { HomePageInfoContent } from './HomePageInfoContent';
import { HomePageInfoPropTypes } from './types';

export const HomePageInfo = ({ toggleInfoComponent }: HomePageInfoPropTypes) => {
    const [readMore, setReadMore] = useState(false);
    const classes = useStyles();

    const toggleInfoText = () => setReadMore(!readMore);

    return (
        <Grid className={`${classes.infoContainer} ${!readMore && classes.smallInfoContainer}`}>
            <HomePageInfoContent
                toggleInfoText={toggleInfoText}
                toggleInfoComponent={toggleInfoComponent}
                readMore={readMore}
            />
        </Grid>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        infoContainer: {
            display: 'flex',
            boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.15)',
            borderRadius: theme.spacing(0.5),
            background: cardBackgroundColor,
            padding: theme.spacing(2),
            position: 'relative',
            maxHeight: 250,
            textAlign: 'left',

            [theme.breakpoints.down('md')]: {
                marginTop: theme.spacing(4),
                padding: theme.spacing(1.5),
                maxHeight: 'none',
                flexDirection: 'column',
                overflowY: 'hidden',
            },

        },
        smallInfoContainer: {
            [theme.breakpoints.down('md')]: {
                maxHeight: '200px',
            },
        },
    }),
);
