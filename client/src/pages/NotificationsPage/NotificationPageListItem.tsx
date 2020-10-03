import React from 'react';
import { TableRow, TableCell, makeStyles, Theme, Typography } from '@material-ui/core';
import { Notifications } from '@material-ui/icons/';
import clsx from 'clsx';

import moment from '../../localizedMoment';

interface Props {
    id: string;
    text: string;
    date: Date;
    isVisited: boolean;
    onClick: (value: string) => void;
}

export const NotificationPageListItem = ({ text, date, id, isVisited, onClick }: Props) => {
    const classes = useStyles();

    return (
        <TableRow
            onClick={() => onClick(id)}
            classes={{ root: clsx({ [classes.background]: true, [classes.visited]: isVisited }) }}
        >
            <TableCell classes={{ root: classes.text }} component="th" scope="row">
                <Notifications
                    classes={{ root: clsx({ [classes.icon]: true, [classes.visited]: isVisited }) }}
                    fontSize="small"
                />
                <span>
                    <Typography variant="caption">{text}</Typography>
                </span>
            </TableCell>
            <TableCell>
                <Typography variant="caption">{moment(date).calendar()}</Typography>
            </TableCell>
        </TableRow>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    text: {
        display: 'flex',
    },
    icon: {
        marginRight: theme.spacing(2),
        color: theme.palette.secondary.main,
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
}));
