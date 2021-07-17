import { createStyles, makeStyles, Box } from '@material-ui/core';

interface Props {
    videoUrl: string;
    isPreview?: boolean;
}

export const ArticleVideo = ({ videoUrl, isPreview }: Props) => {
    const classes = useStyles();
    console.log(classes);

    return <Box>{videoUrl && <iframe width="560" height="349" src={videoUrl}></iframe>}</Box>;
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
