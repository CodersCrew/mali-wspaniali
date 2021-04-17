import { makeStyles, createStyles, Grid, Typography, Theme } from '@material-ui/core';
import parse from 'html-react-parser';

interface Props {
    contentHTML: string;
    title: string;
    description: string;
}

export const ArticleContent = ({ title, description, contentHTML }: Props) => {
    const classes = useStyles();

    return (
        <Grid container direction="column">
            <Typography variant="h2">{title}</Typography>
            <Typography className={classes.description} variant="h3">
                {description}
            </Typography>
            <Grid item>{parse(contentHTML)}</Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        description: {
            paddingTop: theme.spacing(2),
        },
    }),
);
