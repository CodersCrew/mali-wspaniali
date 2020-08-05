import React from 'react';
import { Tab, makeStyles, createStyles, Theme, TabProps } from '@material-ui/core/';

export const BaseTab = ({ ...props }: TabProps) => {
    const classes = useStyles();

    return (
        <Tab classes={{ root: classes.root, wrapper: classes.wrapper, selected: classes.selected }} {...props}></Tab>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minHeight: '0',
            height: '35px',
            opacity: '1',
            whiteSpace: 'nowrap',
            color: theme.palette.text.secondary,
            textTransform: 'none',
            flexShrink: 2,
            fontWeight: theme.typography.button.fontWeight,
        },
        wrapper: {
            margin: '0 10px',
        },
        selected: {
            height: '45px',
            color: theme.palette.secondary.light,
            borderBottom: '1px solid',
        },
    }),
);
