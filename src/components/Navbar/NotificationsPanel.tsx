import React from 'react'
import { NotificationItem } from './NotificationItem'
import { MenuList, Paper, createStyles, makeStyles, Theme } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import { Notification } from '../../firebase/types'
import { useTranslation } from 'react-i18next';

export type NotificationListProps = {
    notifications: Notification[] | undefined;
}

export const NotificationsPanel = (props: NotificationListProps) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { notifications } = props

    return (
        <Paper className={classes.notificationsPanel}>
            <MenuList dense={true}>
                {notifications && notifications.map((notification) => {
                    const { text, date, isRead, id } = notification
                    return (
                        <NotificationItem key={id} id={id} text={text} date={date} isRead={isRead}/>
                    )
                })}
            </MenuList>
            <Link to={'/parent/notifications'} className={classes.notificationLink}>{t('notification-panel.read-more')}</Link>
        </Paper>
    )
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        notificationsPanel: {
            position: 'absolute',
            top: '80px',
            right: '100px',
            zIndex: 200,
            width: '350px',
            borderRadius: '5px',
            boxShadow: '1px 1px 4px 0 rgba(0, 0, 0, 0.25)',
            backgroundColor: '#ffffff',
        },
        notificationLink: {
            width: '125px',
            height: '40px',
            fontSize: '14px',
            color: '#ff7149',
            float: 'right',
            textDecoration: 'none',
            padding: '7px',
        }
    }))