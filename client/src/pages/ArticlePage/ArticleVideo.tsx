import React from 'react';
import { Grid, CardMedia, createStyles, makeStyles, Theme } from '@material-ui/core';
import { ButtonPrimary } from '../../components/Button';

interface Props {
    videoUrl: string;
    tags: string[];
}

export const ArticleVideo = ({ videoUrl, tags }: Props) => {
    const classes = useStyles();

    return (
        <Grid className={classes.contentVideoContainer} container direction="row" spacing={3}>
            <Grid item xs={12} md={8}>
                <Grid className={classes.contentVideo} item>
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
            [theme.breakpoints.down('sm')]: {
                paddingLeft: '3vw',
                paddingRight: '3vw',
            },
        },

        contentVideoContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
            borderBottom: 'solid',
            borderBottomColor: theme.palette.divider,
            borderBottomWidth: '1px',
            width: '70vw',
            [theme.breakpoints.down('sm')]: {
                width: '100vw',
                paddingRight: `${theme.spacing(2)}px`,
            },
        },
        contentVideoPlayer: {
            minHeight: '35vw',
            border: 'none',
            [theme.breakpoints.down('sm')]: {
                paddingRight: '0',
            },
        },
        contentTags: {
            display: 'flex',
            width: '100%',
            flexWrap: 'wrap',

            [theme.breakpoints.down('xs')]: {
                marginLeft: `${theme.spacing(2)}px`,
            },
        },
        contentTagsButton: {
            color: theme.palette.text.primary,
            borderRadius: theme.spacing(2),
            margin: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px 0`,
        },
    }),
);
