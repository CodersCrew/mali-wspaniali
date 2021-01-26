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
    Theme,
    Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { NotificationPageListItem } from './NotificationPageListItem';
import { Notification } from '../../graphql/types';
import { useNotificationContent } from './useNotificationContent';

interface Props {
    notifications: Notification[];
    onClick: (id: string) => void;
}

export const NotificationPageList = ({ notifications, onClick }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { getNotification } = useNotificationContent();

    return (
        <TableContainer component={Paper}>
            <Table aria-label="Notification table">
                <TableHead>
                    <TableRow>
                        <TableCell classes={{ root: classes.content }}>
                            <Typography variant="subtitle2">{t('notifications-page.content')}</Typography>
                        </TableCell>
                        <TableCell classes={{ root: classes.date }}>
                            <Typography variant="subtitle2">{t('notifications-page.date')}</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {notifications.map((notification) => {
                        const { _id, values, templateId, date, isRead } = notification;

                        return (
                            <NotificationPageListItem
                                key={_id}
                                id={_id}
                                text={getNotification(templateId, values)}
                                date={new Date(date)}
                                isRead={isRead}
                                onClick={onClick}
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
        content: {
            paddingLeft: theme.spacing(7),
            textTransform: 'uppercase',
        },
        date: {
            textTransform: 'uppercase',
        },
    }),
);
