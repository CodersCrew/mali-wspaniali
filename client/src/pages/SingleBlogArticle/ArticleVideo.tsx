import React from 'react';
import { Grid, CardMedia, createStyles, makeStyles, Theme } from '@material-ui/core';
import { SingleArticleColors } from '../../colors';

interface Props {
    videoUrl: string;
}

export const ArticleVideo = ({ videoUrl }: Props) => {
    const classes = useStyles();

    return (
        <Grid className={classes.contentVideoGrid} container direction="row">
            <Grid className={classes.contentVideoContainer} container direction="row">
                <Grid item xs={12}>
                    <Grid container direction="row">
                        <Grid className={classes.contentVideo} item xs={12}>
                            <CardMedia className={classes.contentVideoPlayer} component="iframe" src={videoUrl} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contentVideoGrid: {
            paddingTop: '3vw',
        },
        contentVideoContainer: {
            paddingTop: '3vw',
            borderTop: 'solid',
            borderTopColor: SingleArticleColors.break,
            borderBottom: 'solid',
            borderBottomColor: SingleArticleColors.break,
            borderTopWidth: '1px',
            borderBottomWidth: '1px',
        },
        contentVideo: {
            [theme.breakpoints.down('sm')]: {
                paddingLeft: '3vw',
                paddingRight: '3vw',
            },
        },
        contentVideoPlayer: {
            minWidth: '60vw',
            minHeight: '35vw',
        },
    }),
);
