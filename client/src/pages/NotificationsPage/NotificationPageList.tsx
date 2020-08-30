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
import { white } from '../../colors';
import { Theme } from '../../theme/types';
import { getNotificationContent } from './notificationContent';

interface Props {
    notifications: Notification[];
}

export const NotificationPageList = ({ notifications }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <TableContainer className={classes.list} component={Paper}>
            <Table className={classes.table} aria-label="Notification table">
                <TableHead>
                    <TableRow className={classes.heading}>
                        <TableCell className={classes.content}>
                            {t('notifications-page.content')}
                        </TableCell>
                        <TableCell className={classes.date}>
                            {t('notifications-page.date')}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {notifications.map((notification) => {
                        const {
                            _id,
                            values,
                            templateId,
                            date,
                            isRead,
                        } = notification;

                        const text = getNotificationContent(templateId, values);

                        return (
                            <NotificationPageListItem
                                key={_id}
                                id={_id}
                                text={text}
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
        heading: {
            backgroundColor: theme.palette.primary.main,
        },
        content: {
            paddingLeft: '100px',
            color: white,
            textTransform: 'uppercase',
            fontWeight: 700,
        },
        date: {
            color: white,
            textTransform: 'uppercase',
            fontWeight: 700,
            width: '275px',
        },
    }),
);
