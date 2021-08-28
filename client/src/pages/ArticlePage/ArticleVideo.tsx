import { createStyles, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { articleStore } from '../AdminUpdateArticlePage/ArticleCreator/ArticleCreatorStore';

export const ArticleVideo = observer(function ArticleVideo() {
    const classes = useStyles();
    const { article } = articleStore;

    if (!article) return null;

    return (
        <div className={classes.contentVideoPlayer}>
            <iframe
                width="560"
                src={article.videoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
});

const useStyles = makeStyles(() =>
    createStyles({
        contentVideoPlayer: {
            display: 'flex',
            justifyContent: 'center',
            minHeight: '35vw',
            border: 'none',
        },
    }),
);
