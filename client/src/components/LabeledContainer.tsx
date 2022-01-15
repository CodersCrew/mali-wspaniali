import React from 'react';
import { createStyles, Divider, makeStyles, Paper, Theme, Typography } from '@material-ui/core';

interface Props {
    title: string;
}

export const LabeledContainer: React.FC<Props> = ({ title, children }) => {
    const classes = useStyles();

    return (
        <Paper>
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
        titleContainer: {
            padding: theme.spacing(2),
        },
        contentContainer: {
            padding: theme.spacing(3, 2),
        },
    }),
);
