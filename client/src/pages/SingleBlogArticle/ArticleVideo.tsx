import React from 'react';
import { Grid, CardMedia, createStyles, makeStyles, Theme } from '@material-ui/core';
import { SingleArticleColors } from '../../colors';
import { Button } from '../../components/Button';

interface Props {
    videoUrl: string;
    tags: string[];
}

export const ArticleVideo = ({ videoUrl, tags }: Props) => {
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
                <Grid className={classes.contentTags} item xs={12}>
                    <Grid container direction="row">
                        <Grid item xs={8}>
                            <Grid container direction="row" spacing={10}>
                                {tags.map(tag => {
                                    return (
                                        <Grid key={tag} item xs={3}>
                                            <Button className={classes.contentTagsButton} innerText={`#${tag}`} />
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

const useStyles = makeStyles((theme: Theme) =>
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

            [theme.breakpoints.down('sm')]: {
                paddingTop: '25px',
                paddingBottom: '40px',
                paddingLeft: '10px',
            },
        },
        contentTagsButton: {
            backgroundColor: SingleArticleColors.tagButton,
            width: '8vw',
            height: '3vw',

            [theme.breakpoints.down('sm')]: {
                fontSize: '8px',
                width: '15vw',
                height: '3vh',
                textTransform: 'lowercase',
                color: SingleArticleColors.title,
            },
        },
    }),
);
