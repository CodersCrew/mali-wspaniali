import React from 'react';
import { makeStyles, createStyles, Grid, Avatar, Typography, Box } from '@material-ui/core';
import { lineHeight, letterSpace } from '../../fontStyle';
import { Redactor } from '../../firebase/types';

export const ArticleRedactor = ({ redactor }: { redactor: Redactor }) => {
    const classes = useStyles();

    return (
        <Grid container direction="row">
            <Grid className={classes.contentRedactorAvatarContainer} item xs={3}>
                <Avatar
                    className={classes.contentRedactorAvatar}
                    alt={`${redactor.firstName} ${redactor.lastName}`}
                    src={redactor.avatarUrl}
                />
            </Grid>
            <Grid item xs={6}>
                <Grid container direction="column">
                    <Grid className={classes.contentRedactorNameContainer} item xs={3}>
                        <Typography
                            className={classes.contentRedactorName}
                        >{`${redactor.firstName} ${redactor.lastName}`}</Typography>
                        <Typography className={classes.contentRedactorProf}>{redactor.profession}</Typography>
                    </Grid>
                    <Grid className={classes.contentRedactorDescriptionContainer} item xs={9}>
                        <Box className={classes.contentRedactorDescriptionBox}>
                            <Typography className={classes.contentRedactorDescription}>
                                {redactor.shortDescription}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles(() =>
    createStyles({
        contentRedactorAvatarContainer: {
            paddingTop: '4.2vw',
        },
        contentRedactorAvatar: {
            minWidth: '9vw',
            minHeight: '9vw',
        },
        contentRedactorNameContainer: {
            paddingTop: '4.5vw',
        },
        contentRedactorName: {
            fontSize: '15px',
            fontWeight: 'bold',
            letterSpacing: letterSpace,
            lineHeight,
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
        },
        contentRedactorDescription: {
            fontSize: '18px',
        },
    }),
);
