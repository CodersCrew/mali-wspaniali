import React from 'react';
import {
    makeStyles,
    createStyles,
    Grid,
    Typography,
    Theme,
} from '@material-ui/core';
import { lineHeight, letterSpace } from '../../fontStyle';
import { textColor } from '../../colors';

export const ArticleHeader = ({ title }: { title: string }) => {
    const classes = useStyles();

    return (
        <Grid className={classes.headerLongTitle} item xs={10}>
            <Typography className={classes.headerLongTitleText}>
                {title}
            </Typography>
        </Grid>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        headerLongTitle: {
            paddingTop: '3vw',
            paddingBottom: '5vw',

            [theme.breakpoints.down('sm')]: {
                margin: '-10px 40px 20px 15px',
            },
        },
        headerLongTitleText: {
            fontSize: '34px',
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: letterSpace,
            lineHeight,

            [theme.breakpoints.down('sm')]: {
                fontSize: '21px',
                color: textColor,
                textTransform: 'initial',
            },
        },
    }),
);
