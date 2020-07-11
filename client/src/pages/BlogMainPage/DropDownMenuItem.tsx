import React from 'react';
import { Tab, createStyles, makeStyles } from '@material-ui/core';
import { blogCategoryColors } from '../../colors';

type DropDownMenuTapProps = {
    color: string;
    label: string;
};

export const DropDownMenuItem = ({ color, ...props }: DropDownMenuTapProps) => {
    const classes = useStyles({ color });
    return (
        <Tab
            disableRipple
            classes={{ root: classes.root, wrapper: classes.wrapper, selected: classes.selected }}
            {...props}
        />
    );
};

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            minHeight: '0',
            height: '45px',
            border: ({ color }: { color: string }) => `${blogCategoryColors[color]} solid 1px `,
            borderRadius: '4px',
            opacity: '1',
            whiteSpace: 'nowrap',
            color: ({ color }: { color: string }) => blogCategoryColors[color],
            textTransform: 'none',
            flexShrink: 2,
            fontWeight: 600,
            marginRight: '20px',
            marginBottom: '20px',
            minWidth: 'fit-content',
        },
        wrapper: {
            margin: '0 10px',
        },
        selected: {
            height: '45px',
        },
    }),
);
