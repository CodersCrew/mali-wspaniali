import React from 'react';
import { ListItem, ListItemIcon, ListItemText, makeStyles, Theme, createStyles, fade } from '@material-ui/core';
import clsx from 'clsx';

export interface SingleItemProps {
    name: string;
    icon: JSX.Element;
    link?: string;
    rightIcon?: JSX.Element;
    active?: boolean;
}

interface Props {
    item: SingleItemProps;
    onClick: (link?: string) => void;
    leftPadding?: boolean;
    grayed?: boolean;
}

interface StyleProps {
    leftPadding?: boolean;
}

export function SingleItem({ item, leftPadding, grayed, onClick }: Props) {
    const classes = useStyles({ leftPadding });

    return (
        <ListItem
            button
            key={item.name}
            onClick={() => onClick(item.link)}
            classes={{
                button: clsx({ [classes.button]: true, [classes.grayed]: grayed, [classes.activeButton]: item.active }),
                gutters: classes.rootButton,
            }}
        >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
            {item.rightIcon}
        </ListItem>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        activeButton: {
            background: `${fade(theme.palette.primary.main, 0.2)} !important`,
        },
        button: {
            '&:hover': {
                background: fade(theme.palette.primary.main, 0.2),
            },
        },
        rootButton: {
            paddingLeft: (props: StyleProps) => theme.spacing(props.leftPadding ? 3 : 2),
        },
        grayed: {
            background: theme.palette.grey[100],
        },
    }),
);
