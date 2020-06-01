import React from 'react'
import { TableRow, TableCell, makeStyles } from '@material-ui/core'
import { Notifications } from '@material-ui/icons/';
import moment from '../../localizedMoment';
import clsx from 'clsx';
import { Timestamp } from '../../firebase/types';
import { useAuthorization } from '../../hooks/useAuthorization';
import { setNotificationReadValue } from '../../queries/notificationQueries'
import { secondaryColor, notificationReadColor, darkGrey } from '../../colors';

export type notificationListProps = {
    text: string;
    date: Timestamp;
    id: string;
    isRead: boolean;
}

export const NotificationPageListItem = ({ text, date, id, isRead }: notificationListProps) => {
    const classes = useStyles();
    const currentUser = useAuthorization(true);

    const setNotificationValue = () => {
        if(currentUser) {
            setNotificationReadValue(currentUser.uid, id, !isRead);
        }
    }

    return(
        <TableRow key={id} onClick={setNotificationValue} className={clsx(classes.background, isRead ? 'read' : null)}>
            <TableCell className={classes.text} component="th" scope="row">
                <Notifications className={clsx(classes.icon, isRead ? 'read' : null)}/>
                {text}
            </TableCell>
            <TableCell>{moment(date.toDate()).calendar()}</TableCell>
      </TableRow>
    )
}

const useStyles = makeStyles({
    text: {
        color: 'black',
        fontSize: '16px'
    },
    icon: {
        position: 'relative',
        width: '85px',
        color: secondaryColor,
        '&.read': {
            color: notificationReadColor,
        }
    },
    background: {
        '&:hover': {
            cursor: 'pointer'
        },
        '&.read': {
            backgroundColor: darkGrey,
            transition: 'backgroundColor .3s'
        }
    }
  });