import React from 'react';
import { Grid, CardMedia, createStyles, makeStyles, Theme } from '@material-ui/core';
import { ButtonPrimary } from '../../components/Button';
//import { customArticleTheme } from './ArticlePage';

interface Props {
    videoUrl: string;
    tags: string[];
}

export const ArticleVideo = ({ videoUrl, tags }: Props) => {
    const classes = useStyles();

    return (
        <Grid className={classes.contentVideoContainer} container direction="row">
            <Grid className={classes.wrapperContainer} item lg={12} xs={12}>
                <Grid className={classes.contentVideo}>
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
        </Grid>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contentVideo: {
            width: '95vw',

            [theme.breakpoints.up('md')]: {
                width: '82vw',
            },

            [theme.breakpoints.up('lg')]: {
                width: '62vw',
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

            [theme.breakpoints.down('md')]: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
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
            margin: `${theme.spacing(2)}px 0 ${theme.spacing(4)}px 0`,

            [theme.breakpoints.down('xs')]: {
                marginLeft: `${theme.spacing(1)}px`,
            },
            [theme.breakpoints.up('xl')]: {
                margin: `${theme.spacing(2)}px 0 ${theme.spacing(5)}px 0`,
            },
        },
        contentTagsButton: {
            color: theme.palette.text.primary,
            borderRadius: theme.spacing(2),
            margin: `${theme.spacing(2)}px ${theme.spacing(2)}px 0 0`,
        },
    }),
);
