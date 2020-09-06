import React from 'react';
import { Grid, CardMedia, createStyles, makeStyles, Theme } from '@material-ui/core';
import { SingleArticleColors } from '../../colors';
import { ButtonPrimary } from '../../components/Button';

interface Props {
    videoUrl: string;
    tags: string[];
}

export const ArticleVideo = ({ videoUrl, tags }: Props) => {
    const classes = useStyles();

    return (
        <Grid className={classes.contentVideoContainer} container direction="row" spacing={3}>
            <Grid item xs={12} className={classes.contentVideoSubContainer}>
                <Grid className={classes.contentVideo} item xs={12}>
                    <CardMedia className={classes.contentVideoPlayer} component="iframe" src={videoUrl} />
                </Grid>
            </Grid>

            <Grid className={classes.contentTags} item>
                {tags.map((tag, index) => {
                    return (
                        <ButtonPrimary
                            key={`${tag} ${index}`}
                            variant="contained"
                            disableElevation
                            className={classes.contentTagsButton}
                            innerText={`#${tag}`}
                        />
                    );
                })}
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contentVideo: {
            display: 'flex',
            justifyContent: 'flex-end',
            [theme.breakpoints.down('sm')]: {
                paddingLeft: '3vw',
                paddingRight: '3vw',
            },
        },
        contentVideoSubContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
            paddingTop: theme.spacing(3),
        },
        contentVideoContainer: {
            borderTop: 'solid',
            borderTopColor: SingleArticleColors.break,
            borderBottom: 'solid',
            borderBottomColor: SingleArticleColors.break,
            borderTopWidth: '1px',
            borderBottomWidth: '1px',
        },
        contentVideoPlayer: {
            minHeight: '35vw',
            width: '50vw',
        },
        contentTags: {
            display: 'flex',
            width: '100%',
            flexWrap: 'wrap',

            [theme.breakpoints.down('sm')]: {
                marginLeft: '10px',
            },
        },
        contentTagsButton: {
            color: 'black',
            borderRadius: theme.spacing(2),
        },
    }),
);
