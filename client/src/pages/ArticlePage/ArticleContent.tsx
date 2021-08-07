import { makeStyles, createStyles, Grid, Typography, Theme } from '@material-ui/core';
import clsx from 'clsx';
import parse from 'html-react-parser';

interface Props {
    contentHTML: string;
    title: string;
    description: string;
    isPreview: boolean;
}

export const ArticleContent = ({ title, description, contentHTML, isPreview }: Props) => {
    const classes = useStyles();

    return (
        <Grid container direction="column">
            <Typography variant="h2">{title}</Typography>
            <Typography className={classes.description} variant="h3">
                {description}
            </Typography>
            <Grid item className={clsx({ [classes.isPreview]: isPreview })}>
                {parse(contentHTML)}
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        isPreview: {
            opacity: 0.5,
        },
        description: {
            paddingTop: theme.spacing(2),
        },
    }),
);
