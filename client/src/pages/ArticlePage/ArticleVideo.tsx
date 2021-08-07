import { createStyles, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

interface ArticleVideoProps {
    videoUrl: string;
    isPreview: boolean;
}

export function ArticleVideo({ videoUrl, isPreview }: ArticleVideoProps) {
    const classes = useStyles();

    if (!videoUrl) return null;

    return (
        <div className={clsx({ [classes.contentVideoPlayer]: true, [classes.isPreview]: isPreview })}>
            <iframe
                width="560"
                src={videoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
}

const useStyles = makeStyles(() =>
    createStyles({
        isPreview: { opcity: 0.5 },
        contentVideoPlayer: {
            display: 'flex',
            justifyContent: 'center',
            minHeight: '35vw',
            border: 'none',
        },
    }),
);
