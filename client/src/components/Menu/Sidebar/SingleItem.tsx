import React from 'react';
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Theme,
    createStyles,
} from '@material-ui/core';
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
}

interface StyleProps {
    leftPadding?: boolean;
}

export function SingleItem({ item, leftPadding, onClick }: Props) {
    const classes = useStyles({ leftPadding });

    return (
        <ListItem
            button
            key={item.name}
            onClick={() => onClick(item.link)}
            classes={{
                button: clsx({
                    [classes.button]: true,
                    [classes.activeButton]: item.active,
                }),
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
            background: 'rgba(0, 172, 193, 0.08)',
        },
        button: {
            '&:hover': {
                background: 'rgba(0, 172, 193, 0.08)',
            },
        },
        rootButton: {
            paddingLeft: (props: StyleProps) =>
                theme.spacing(props.leftPadding ? 3 : 2),
        },
    }),
);
