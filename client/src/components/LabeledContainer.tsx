import { FC } from 'react';
import { createStyles, Divider, makeStyles, Paper, Theme, Typography } from '@material-ui/core';

interface Props {
    title: string;
}

export const LabeledContainer: FC<Props> = ({ title, children }) => {
    const classes = useStyles();

    return (
        <Paper classes={{ root: classes.container }}>
            <div className={classes.titleContainer}>
                <Typography variant="h4">{title}</Typography>
            </div>
            <Divider />
            <div className={classes.contentContainer}>{children}</div>
        </Paper>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: '100%',
        },
        titleContainer: {
            padding: theme.spacing(2),
        },
        contentContainer: {
            padding: theme.spacing(3, 2),
        },
    }),
);
