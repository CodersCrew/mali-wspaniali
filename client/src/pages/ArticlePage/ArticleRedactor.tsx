import React from 'react';
import { makeStyles, createStyles, Grid, Avatar, Typography, Box, Theme } from '@material-ui/core';
import { Redactor } from '../../graphql/types';

interface Props {
    redactor: Redactor;
}

export const ArticleRedactor = ({ redactor }: Props) => {
    const classes = useStyles();

    return (
        <Grid container direction="row" className={classes.wrapper}>
            <Grid className={classes.contentRedactorAvatarContainer} item>
                <Avatar
                    className={classes.contentRedactorAvatar}
                    alt={`${redactor.firstName} ${redactor.lastName}`}
                    src={redactor.avatarUrl}
                />
            </Grid>
            <Grid item xs={6}>
                <Grid container direction="column">
                    <Grid className={classes.contentRedactorNameContainer} item xs={3} md={9}>
                        <Typography className={classes.contentRedactorProf}>{redactor.profession}</Typography>
                        <Typography
                            className={classes.contentRedactorName}
                        >{`${redactor.firstName} ${redactor.lastName}`}</Typography>
                    </Grid>
                    <Grid>
                        <Box className={classes.contentRedactorDescriptionBox}>
                            <Typography className={classes.contentRedactorDescription}>{redactor.biography}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            width: '70vw',

            [theme.breakpoints.down('md')]: {
                paddingRight: `${theme.spacing(2)}px`,
                width: '100vw',
            },
        },
        contentRedactorAvatarContainer: {
            paddingRight: `${theme.spacing(3)}px`,

            [theme.breakpoints.down('sm')]: {
                paddingRight: `${theme.spacing(2)}px`,
            },
        },
        contentRedactorAvatar: {
            width: '94px',
            height: '94px',

            [theme.breakpoints.down('sm')]: {
                width: '70px',
                height: '70px',
            },
        },
        contentRedactorNameContainer: {
            paddingTop: `${theme.spacing(1)}px`,
        },
        contentRedactorProf: {
            fontSize: theme.typography.overline.fontSize,
            letterSpacing: theme.typography.overline.letterSpacing,
            lineHeight: theme.typography.overline.lineHeight,
            textTransform: 'uppercase',
        },
        contentRedactorName: {
            fontSize: theme.typography.h4.fontSize,
            fontWeight: theme.typography.button.fontWeight,
            letterSpacing: theme.typography.h4.letterSpacing,
            lineHeight: theme.typography.h4.lineHeight,

            [theme.breakpoints.down('sm')]: {
                width: '100vw',
            },
        },
        contentRedactorDescriptionBox: {
            fontWeight: theme.typography.button.fontWeight,
            marginTop: `${theme.spacing(2)}px`,
            padding: 0,
        },
        contentRedactorDescription: {
            fontSize: theme.typography.subtitle1.fontSize,
            padding: 0,
        },
    }),
);
