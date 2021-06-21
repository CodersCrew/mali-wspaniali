import { CardMedia, Box, createStyles, makeStyles } from '@material-ui/core';

import video from '../../assets/adminPreviewPhoto/video.png';
import { articleContent } from './utils';

interface Props {
    videoUrl: string;
    isPreview?: boolean;
}

export const ArticleVideo = ({ videoUrl, isPreview }: Props) => {
    const classes = useStyles();

    return (
        <Box>
            <CardMedia
                className={classes.contentVideoPlayer}
                component="iframe"
                src={articleContent(isPreview, videoUrl, video)}
            />
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
