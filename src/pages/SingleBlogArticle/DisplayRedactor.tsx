import React from 'react';
import { makeStyles, Theme, createStyles, Grid, Avatar, Typography, Box } from '@material-ui/core';

export const DisplayRedactor = ({
    firstName,
    lastName,
    avatarUrl,
    profession,
    shortDescription,
}: {
    firstName: string;
    lastName: string;
    avatarUrl: string;
    profession: string;
    shortDescription: string;
}) => {
    const useStyles = makeStyles((theme: Theme) =>
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
                letterSpacing: '2px',
                lineHeight: '1.17',
            },
            contentRedactorProf: {
                fontSize: '14px',
                letterSpacing: '2px',
                lineHeight: '1.17',
            },
            contentRedactorDescriptionContainer: {
                paddingTop: '1vw',
            },
            contentRedactorDescription: {
                fontSize: '18px',
            },
        }),
    );
    const classes = useStyles();

    return (
        <>
            <Grid container direction="row">
                <Grid className={classes.contentRedactorAvatarContainer} item xs={3}>
                    <Avatar
                        className={classes.contentRedactorAvatar}
                        alt={`${firstName} ${lastName}`}
                        src={avatarUrl}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Grid container direction="column">
                        <Grid className={classes.contentRedactorNameContainer} item xs={3}>
                            <Typography className={classes.contentRedactorName}>
                                {`${firstName} ${lastName}`}
                            </Typography>
                            <Typography className={classes.contentRedactorProf}>{profession}</Typography>
                        </Grid>
                        <Grid className={classes.contentRedactorDescriptionContainer} item xs={9}>
                            <Box fontWeight={500}>
                                <Typography className={classes.contentRedactorDescription}>
                                    {shortDescription}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
