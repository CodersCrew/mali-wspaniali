import { CardMedia, createStyles, makeStyles } from '@material-ui/core';

interface Props {
    videoUrl: string;
}

export const ArticleVideo = ({ videoUrl }: Props) => {
    const classes = useStyles();

    return <CardMedia className={classes.contentVideoPlayer} component="iframe" src={videoUrl} />;
};

const useStyles = makeStyles(() =>
    createStyles({
        contentVideoPlayer: {
            minHeight: '35vw',
            border: 'none',
        },
    }),
);
