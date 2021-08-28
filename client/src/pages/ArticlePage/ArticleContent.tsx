import { makeStyles, createStyles, Grid, Typography, Theme } from '@material-ui/core';
import parse from 'html-react-parser';
import { observer } from 'mobx-react-lite';
import { articleStore } from '../AdminUpdateArticlePage/ArticleCreator/ArticleCreatorStore';

export const ArticleContent = observer(() => {
    const classes = useStyles();
    const { article } = articleStore;

    if (!article) return null;

    return (
        <Grid container direction="column">
            <Typography variant="h2">{article.title}</Typography>
            <Typography className={classes.description} variant="h3">
                {article.description}
            </Typography>
            <Grid item>{parse(article.contentHTML)}</Grid>
        </Grid>
    );
});

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        description: {
            paddingTop: theme.spacing(2),
        },
    }),
);
