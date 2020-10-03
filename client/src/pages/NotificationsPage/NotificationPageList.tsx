import React from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Paper,
    makeStyles,
    TableBody,
    createStyles,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { NotificationPageListItem } from './NotificationPageListItem';
import { Notification } from '../../graphql/types';
import { Theme } from '../../theme/types';
import { getNotificationContent } from './notificationContent';

interface Props {
    notifications: Notification[];
}

export const NotificationPageList = ({ notifications }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const getNotification = getNotificationContent();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="Notification table">
                <TableHead>
                    <TableRow className={classes.heading}>
                        <TableCell className={classes.content}>{t('notifications-page.content')}</TableCell>
                        <TableCell className={classes.date}>{t('notifications-page.date')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {notifications.map(notification => {
                        const { _id, values, templateId, date, isRead } = notification;

                        return (
                            <NotificationPageListItem
                                key={_id}
                                id={_id}
                                text={getNotification(templateId, values)}
                                date={new Date(date)}
                                isRead={isRead}
                                onClick={() => {
                                    /* todo */
                                }}
                            />
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            minWidth: 650,
        },
        list: {
            marginTop: '100px',
        },
        heading: {},
        content: {
            paddingLeft: '100px',
            textTransform: 'uppercase',
            fontWeight: 700,
        },
        date: {
            textTransform: 'uppercase',
            fontWeight: 700,
            width: '275px',
        },
    }),
);
