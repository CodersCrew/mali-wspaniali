import React from 'react';
import { Grid, CardMedia, createStyles, makeStyles, Theme } from '@material-ui/core';
import { customArticleTheme } from './ArticleContent';
import { ButtonPrimary } from '../../components/Button';

interface Props {
    videoUrl: string;
    tags: string[];
}

export const ArticleVideo = ({ videoUrl, tags }: Props) => {
    const classes = useStyles();

    return (
        <Grid className={classes.contentVideoContainer} container direction="row">
            <Grid className={classes.contentVideo} item xs={12}>
                <CardMedia className={classes.contentVideoPlayer} component="iframe" src={videoUrl} />
            </Grid>

            <Grid className={classes.contentTags} item lg={8} md={11} xs={12}>
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
            width: '92vw',
            paddingRight: theme.spacing(2),

            [customArticleTheme.breakpoints.up('md')]: {
                width: '82vw',
            },

            [theme.breakpoints.up('lg')]: {
                width: '50vw',
            },
        },
        wrapperContainer: {
            display: 'flex',
            flexDirection: 'column',
        },

        contentVideoContainer: {
            borderBottom: 'solid',
            borderBottomColor: theme.palette.divider,
            borderBottomWidth: '1px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        contentVideoPlayer: {
            minHeight: '35vw',
            border: 'none',
        },
        contentTags: {
            display: 'flex',
            width: '100%',
            flexWrap: 'wrap',
            margin: theme.spacing(2, 0, 4),
            alignSelf: 'flex-start',

            [theme.breakpoints.down('xs')]: {
                marginLeft: theme.spacing(1),
            },
            [theme.breakpoints.up('xl')]: {
                margin: theme.spacing(2, 0, 5),
            },
        },
        contentTagsButton: {
            color: theme.palette.text.primary,
            borderRadius: theme.spacing(2),
            margin: theme.spacing(2, 2, 0, 0),
        },
    }),
);
