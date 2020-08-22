import React from 'react';
import { Grid, CardMedia, createStyles, makeStyles, Theme } from '@material-ui/core';
import { SingleArticleColors } from '../../colors';
import { ButtonDefault } from '../../components/Button';

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
                <div className={classes.contentTags}>
                    {tags.map(tag => {
                        return (
                            <ButtonDefault
                                variant="contained"
                                disableElevation
                                className={classes.contentTagsButton}
                                innerText={`#${tag}`}
                            />
                        );
                    })}
                </div>
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
            [theme.breakpoints.down('sm')]: {
                paddingLeft: '3vw',
                paddingRight: '3vw',
            },
        },
        contentVideoContainer: {
            paddingTop: '6.4vw',
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
            margin: '30px 0',
            display: 'flex',
            width: '100%',
            flexWrap: 'wrap',

            [theme.breakpoints.down('sm')]: {
                marginLeft: '10px',
            },
        },
        contentTagsButton: {
            margin: '10px',
            marginLeft: 0,
        },
    }),
);
