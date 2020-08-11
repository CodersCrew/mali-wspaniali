import React from 'react';
import { TableRow, TableCell, makeStyles } from '@material-ui/core';
import { Notifications } from '@material-ui/icons/';
import clsx from 'clsx';
import moment from '../../localizedMoment';
import { secondaryColor, notificationReadColor, darkGrey } from '../../colors';

interface Props {
    id: string;
    text: string;
    date: Date;
    isRead: boolean;
    onClick: (value: string) => void;
}

export const NotificationPageListItem = ({ text, date, id, isRead, onClick }: Props) => {
    const classes = useStyles();

    return (
        <TableRow key={id} onClick={() => onClick(id)} className={clsx({ [classes.background]: true, read: isRead })}>
            <TableCell key={id} className={classes.text} component="th" scope="row">
                <Notifications className={clsx({ [classes.icon]: true, read: isRead })} />
                {text}
            </TableCell>
            <TableCell>{moment(date).calendar()}</TableCell>
        </TableRow>
    );
};

const useStyles = makeStyles({
    text: {
        color: 'black',
        fontSize: '16px',
    },
    icon: {
        position: 'relative',
        width: '85px',
        color: secondaryColor,
        '&.read': {
            color: notificationReadColor,
        },
    },
    background: {
        '&:hover': {
            cursor: 'pointer',
        },
        '&.read': {
            backgroundColor: darkGrey,
            transition: 'backgroundColor .3s',
        },
    },
});
