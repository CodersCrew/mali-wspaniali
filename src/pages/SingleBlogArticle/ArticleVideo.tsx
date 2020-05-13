import React from 'react';
import { Grid, CardMedia, Button, createStyles, makeStyles } from '@material-ui/core';
import { SingleArticleColors } from '../../colors';
import { Video } from './types';

export const ArticleVideo = ({ video }: { video: Video }) => {
    const classes = useStyles();

    return (
        <Grid className={classes.contentVideoGrid} container direction="row">
            <Grid className={classes.contentVideoContainer} container direction="row">
                <Grid item xs={12}>
                    <Grid container direction="row">
                        <Grid className={classes.contentVideo} item xs={12}>
                            <CardMedia className={classes.contentVideoPlayer} component="iframe" src={video.videoUrl} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className={classes.contentTags} item xs={12}>
                    <Grid container direction="row">
                        <Grid item xs={8}>
                            <Grid container direction="row">
                                {video.tags.map(tag => {
                                    return (
                                        <Grid key={tag} item xs={3}>
                                            <Button className={classes.contentTagsButton}>{`#${tag}`}</Button>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles(() =>
    createStyles({
        contentVideoGrid: {
            paddingTop: '2vw',
        },
        contentVideo: {
            paddingLeft: '3vw',
            paddingRight: '3vw',
        },
        contentVideoContainer: {
            paddingTop: '6.4vw',
            paddingBottom: '4.3vw',
            borderTop: 'solid',
            borderTopColor: SingleArticleColors.break,
            borderBottom: 'solid',
            borderBottomColor: SingleArticleColors.break,
            borderTopWidth: '1px',
            borderBottomWidth: '1px',
        },
        contentVideoPlayer: {
            minWidth: '60vw',
            minHeight: '35vw',
        },
        contentTags: {
            paddingTop: '4vw',
        },
        contentTagsButton: {
            backgroundColor: SingleArticleColors.tagButton,
            width: '8vw',
            height: '3vw',
            fontFamily: 'Roboto',
            fontSize: '12px',
            fontWeight: 'bold',
        },
    }),
);
