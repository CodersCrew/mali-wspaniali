import React from 'react';
import { makeStyles, Theme, createStyles, Grid, Typography } from '@material-ui/core';
import { SingleArticleColors } from '../../colors';

export const DisplayHeader = ({title}: {title: string}) => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            headerLongTitle: {
                paddingTop: '3vw',
                paddingBottom: '5vw',
            },
            headerLongTitleText: {
                fontSize: '34px',
                color: SingleArticleColors.mainColor,
                fontWeight: 'bold',
                letterSpacing: '2px',
                lineHeight: '1.17',
            },
        }),
    );
    const classes = useStyles();

    return (
        <>
            <Grid className={classes.headerLongTitle} item xs={10}>
                <Typography className={classes.headerLongTitleText}>
                    {title.toUpperCase()}
                </Typography>
            </Grid>
        </>
    );
}
