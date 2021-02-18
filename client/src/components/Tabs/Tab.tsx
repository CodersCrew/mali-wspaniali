import React from 'react';
import { Tab as MuiTab, makeStyles, createStyles, Theme, TabProps } from '@material-ui/core/';

export const Tab = (props: TabProps) => {
    const classes = useStyles();

    return <MuiTab classes={{ root: classes.root, wrapper: classes.wrapper, selected: classes.selected }} {...props} />;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minHeight: '0',
            height: '45px',
            opacity: '1',
            whiteSpace: 'nowrap',
            color: theme.palette.text.secondary,
            textTransform: 'uppercase',
            fontWeight: theme.typography.button.fontWeight,
            padding: 0,
            minWidth: 'fit-content',
        },
        wrapper: {
            margin: '12px',
            '&:hover': {
                color: theme.palette.secondary.dark,
            },
        },
        selected: {
            color: theme.palette.secondary.light,
        },
    }),
);
