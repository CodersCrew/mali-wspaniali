import React from 'react';
import { Tab, createStyles, makeStyles, Theme } from '@material-ui/core';
import { white, blogCategoryColors } from '../../colors';

interface Props {
    color: string;
    label: string;
}

export const StyledTab = ({ color, label, ...props }: Props) => {
    const classes = useStyles({ color });

    return (
        <Tab
            disableRipple
            color={color}
            label={label}
            classes={{ root: classes.root, wrapper: classes.wrapper, selected: classes.selected }}
            {...props}
        />
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minHeight: '0',
            height: '35px',
            backgroundColor: ({ color }: { color: string }) => blogCategoryColors[color],
            borderRadius: '4px',
            opacity: '1',
            whiteSpace: 'nowrap',
            color: white,
            textTransform: 'none',
            flexShrink: 2,
            fontWeight: 600,
        },
        wrapper: {
            margin: '0 10px',
        },
        selected: {
            height: '45px',
        },
    }),
);
