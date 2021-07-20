import { CardMedia, Box, createStyles, makeStyles } from '@material-ui/core';

interface Props {
    videoUrl: string;
}

export const ArticleVideo = ({ videoUrl }: Props) => {
    const classes = useStyles();

    return (
        <Box>
            <CardMedia className={classes.contentVideoPlayer} component="iframe" src={videoUrl} />
        </Box>
    );
};

const useStyles = makeStyles(() =>
    createStyles({
        contentVideoPlayer: {
            minHeight: '35vw',
            minWidth: '50vw',
            border: 'none',
        },
    }),
);
