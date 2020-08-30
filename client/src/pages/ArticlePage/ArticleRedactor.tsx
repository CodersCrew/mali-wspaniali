import React from 'react';
import {
    makeStyles,
    createStyles,
    Grid,
    Avatar,
    Typography,
    Box,
    Theme,
} from '@material-ui/core';
import { lineHeight, letterSpace } from '../../fontStyle';
import { Redactor } from '../../graphql/types';

interface Props {
    redactor: Redactor;
}

export const ArticleRedactor = ({ redactor }: Props) => {
    const classes = useStyles();

    return (
        <Grid container direction="row">
            <Grid
                className={classes.contentRedactorAvatarContainer}
                item
                xs={3}
            >
                <Avatar
                    className={classes.contentRedactorAvatar}
                    alt={`${redactor.firstName} ${redactor.lastName}`}
                    src={redactor.avatarUrl}
                />
            </Grid>
            <Grid item xs={6}>
                <Grid container direction="column">
                    <Grid
                        className={classes.contentRedactorNameContainer}
                        item
                        xs={3}
                    >
                        <Typography
                            className={classes.contentRedactorName}
                        >{`${redactor.firstName} ${redactor.lastName}`}</Typography>
                        <Typography className={classes.contentRedactorProf}>
                            {redactor.profession}
                        </Typography>
                    </Grid>
                    <Grid
                        className={classes.contentRedactorDescriptionContainer}
                        item
                        xs={9}
                    >
                        <Box className={classes.contentRedactorDescriptionBox}>
                            <Typography
                                className={classes.contentRedactorDescription}
                            >
                                {redactor.biography}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contentRedactorAvatarContainer: {
            paddingTop: '4.2vw',
        },
        contentRedactorAvatar: {
            minWidth: '9vw',
            minHeight: '9vw',

            [theme.breakpoints.down('sm')]: {
                width: '66px',
                height: '66px',
                marginRight: '25px',
                marginLeft: '10px',
            },
        },
        contentRedactorNameContainer: {
            paddingTop: '4.5vw',

            [theme.breakpoints.down('sm')]: {
                paddingTop: '9vw',
                marginLeft: '15px',
            },
        },
        contentRedactorName: {
            fontSize: '15px',
            fontWeight: 'bold',
            letterSpacing: letterSpace,
            lineHeight,

            [theme.breakpoints.down('sm')]: {
                width: '100vw',
            },
        },
        contentRedactorProf: {
            fontSize: '14px',
            letterSpacing: letterSpace,
            lineHeight,
        },
        contentRedactorDescriptionContainer: {
            paddingTop: '1vw',
        },
        contentRedactorDescriptionBox: {
            fontWeight: 500,

            [theme.breakpoints.down('sm')]: {
                marginTop: '35px',
                marginLeft: '-80px',
                marginBottom: '30px',
            },
        },
        contentRedactorDescription: {
            fontSize: '18px',

            [theme.breakpoints.down('sm')]: {
                fontSize: '13px',
            },
        },
    }),
);
