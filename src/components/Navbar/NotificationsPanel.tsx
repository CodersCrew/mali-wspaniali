import React from 'react'
import { useTranslation } from 'react-i18next';
import { MenuList, Paper, createStyles, makeStyles, Theme } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import { NotificationItem } from './NotificationItem'
import { white, secondaryColor } from '../../colors';
import { Notification } from '../../firebase/types'

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
    }))