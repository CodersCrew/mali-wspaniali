import React from 'react'
import { TableContainer, Table, TableHead, TableRow, TableCell, Paper, makeStyles, TableBody } from '@material-ui/core'
import { useTranslation } from 'react-i18next';
import { NotificationPageListItem } from './NotificationPageListItem'
import { Notification } from '../../firebase/types';

export type NotificationListProps = {
    notifications: Notification[] | undefined;
}

export const NotificationPageList = (props: NotificationListProps) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { notifications } = props;

    return(
      <TableContainer className={classes.list} component={Paper}>
        <Table className={classes.table} aria-label="Notification table">
          <TableHead>
            <TableRow className={classes.heading}>
              <TableCell className={classes.content}>{t('notifications-page.content')}</TableCell>
              <TableCell className={classes.date}>{t('notifications-page.date')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications && notifications.map((notification) => {
                const { id, text, date, isRead } = notification;
                return (
                    <NotificationPageListItem id={id} text={text} date={date} isRead={isRead}/>
                )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
}


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    list: {
        marginTop: '100px',
    },
    heading: {
        backgroundColor: '#008aad',
    },
    content: {
        paddingLeft: '100px',
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: 700
    },
    date: {
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: 700,
        width: '275px'
    }
  });