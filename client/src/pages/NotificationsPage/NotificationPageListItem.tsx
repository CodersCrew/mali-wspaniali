import { TableRow, TableCell, makeStyles, Theme, Typography, IconButton } from '@material-ui/core';
import { Notifications } from '@material-ui/icons/';
import clsx from 'clsx';

import { Notification } from '@app/graphql/types';
import dayjs from '../../localizedMoment';
import { useNotificationContent } from './useNotificationContent';

interface Props {
    notification: Notification;
    onClick: (id: string) => void;
}

export const NotificationPageListItem = ({ notification, onClick }: Props) => {
    const classes = useStyles();
    const { getNotification } = useNotificationContent();
    const text = getNotification(notification.templateId, notification.values);
    const date = new Date(notification.createdAt);
    const isVisited = notification.isRead;

    return (
        <TableRow
            classes={{ root: clsx({ [classes.background]: !isVisited, [classes.visited]: isVisited }) }}
            onClick={() => !isVisited && onClick(notification._id)}
        >
            <TableCell classes={{ root: classes.text }}>
                <IconButton
                    size="small"
                    onClick={() => !isVisited && onClick(notification._id)}
                    disabled={isVisited}
                    color="secondary"
                    classes={{ root: classes.iconButton }}
                >
                    <Notifications />
                </IconButton>
                <Typography variant="body2">{text}</Typography>
            </TableCell>
            <TableCell align="right" classes={{ root: classes.calendarCell }}>
                <Typography variant="body2">{dayjs(date).fromNow()}</Typography>
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
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.default,
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
        padding: theme.spacing(1),
        paddingRight: theme.spacing(2),
    },
}));
