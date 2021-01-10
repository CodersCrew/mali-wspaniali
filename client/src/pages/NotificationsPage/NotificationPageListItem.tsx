import React from 'react';
import { TableRow, TableCell, makeStyles, Theme, Typography, IconButton } from '@material-ui/core';
import { Notifications } from '@material-ui/icons/';
import clsx from 'clsx';

import moment from '../../localizedMoment';

interface Props {
    id: string;
    text: string;
    date: Date;
    isRead: boolean;
    onClick: (id: string) => void;
}

export const NotificationPageListItem = ({ text, date, id, isRead, onClick }: Props) => {
    const classes = useStyles();

    return (
        <TableRow
            classes={{ root: clsx({ [classes.background]: !isRead, [classes.visited]: isRead }) }}
            onClick={() => !isRead && onClick(id)}
        >
            <TableCell classes={{ root: classes.text }}>
                <IconButton
                    size="small"
                    onClick={() => !isRead && onClick(id)}
                    disabled={isRead}
                    color="secondary"
                    classes={{ root: classes.iconButton }}
                >
                    <Notifications />
                </IconButton>
                <span>
                    <Typography variant="caption">{text}</Typography>
                </span>
            </TableCell>
            <TableCell align="right" classes={{ root: classes.calendarCell }}>
                <Typography variant="caption">{moment(date).calendar()}</Typography>
            </TableCell>
        </TableRow>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    text: {
        display: 'flex',
        alignItems: 'center',
        padding: 8,
        paddingLeft: 0,
    },
    visited: {
        color: '#C4C4C4',
        background: theme.palette.background.default,
        transition: 'backgroundColor .3s',
    },
    background: {
        '&:hover': {
            cursor: 'pointer',
            background: theme.palette.background.default,
        },
    },
    iconButton: {
        margin: theme.spacing(0, 1),
    },
    calendarCell: {
        width: 215,
        padding: 8,
        paddingRight: 16,
    },
}));
