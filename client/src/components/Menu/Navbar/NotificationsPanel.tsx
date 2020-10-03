import React from 'react';
import { useTranslation } from 'react-i18next';
import { MenuList, Paper, createStyles, makeStyles, Theme, Typography } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import { Notifications } from '@material-ui/icons/';

import { NotificationItem } from './NotificationItem';
import { white, secondaryColor } from '../../../colors';
import { Notification } from '../../../graphql/types';
import { useNotificationContent } from '../../../pages/NotificationsPage/useNotificationContent';

export type NotificationListProps = {
    role: string;
    notifications: Notification[];
};

export const NotificationsPanel = ({ role, notifications }: NotificationListProps) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Paper className={classes.notificationsPanel}>
            <div className={classes.header}>
                <Typography variant="subtitle2">{t('notification-panel.title')}</Typography>
            </div>
            {notifications.length === 0 ? (
                <EmptyMessage />
            ) : (
                <ListComponent notifications={notifications} role={role} />
            )}
        </Paper>
    );
};

function EmptyMessage() {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.emptyMessageContainer}>
            <Notifications fontSize="large" classes={{ root: classes.emptyMessageIcon }} />
            <Typography variant="caption" classes={{ root: classes.emptyMessageDescription }}>
                {t('notification-panel.empty-content')}
            </Typography>
        </div>
    );
}

function ListComponent({ notifications, role }: { notifications: Notification[]; role: string }) {
    const { getNotification } = useNotificationContent();
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <>
            <MenuList dense={true} classes={{ padding: classes.list }}>
                {notifications.map(notification => {
                    const { templateId, date, _id, isRead } = notification;

                    return (
                        <NotificationItem
                            key={_id}
                            id={_id}
                            text={getNotification(templateId, notification.values)}
                            date={date}
                            isRead={isRead}
                        />
                    );
                })}
            </MenuList>
            <Link to={`/${role}/notifications`} className={classes.notificationLink}>
                {t('notification-panel.read-more')}
            </Link>
        </>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
            borderBottom: `1px solid ${theme.palette.background.default}`,
        },
        list: {
            padding: 0,
            maxHeight: '50vh',
            minHeight: '167px',
            overflowY: 'auto',
        },
        notificationsPanel: {
            position: 'absolute',
            top: theme.spacing(7),
            right: theme.spacing(3),
            zIndex: 200,
            width: 328,
            borderRadius: '5px',
            boxShadow: '1px 1px 4px 0 rgba(0, 0, 0, 0.25)',
            backgroundColor: white,
            [theme.breakpoints.down('sm')]: {
                position: 'fixed',
                width: '100%',
                top: '60px',
                right: 0,
            },
        },
        notificationLink: {
            width: '125px',
            height: '40px',
            fontSize: '14px',
            color: secondaryColor,
            float: 'right',
            textDecoration: 'none',
            padding: '7px',
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            },
        },
        emptyMessageContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        emptyMessageIcon: {
            marginTop: 27,
            marginBottom: theme.spacing(3),
            color: theme.palette.text.secondary,
        },
        emptyMessageDescription: {
            marginBottom: 61,
            color: theme.palette.text.secondary,
        },
    }),
);
