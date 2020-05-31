import React from 'react';
import moment from 'moment';
import { Notifications } from '@material-ui/icons/';
import { ListItem, Typography, createStyles, makeStyles, Theme, MenuItem } from '@material-ui/core/';
import { Timestamp } from '../../firebase/types';
import clsx from 'clsx';
import { secondaryColor } from '../../colors';
import { useAuthorization } from '../../hooks/useAuthorization';
import { setNotificationReadValue } from '../../queries/notificationQueries'

type notificationListProps = {
    text: string;
    date: Timestamp;
    isRead: boolean;
    id: string;
}

export const NotificationItem = ({ text, date, isRead, id }: notificationListProps) => {
    const classes = useStyles();
    const currentUser = useAuthorization(true);

    const setNotificationValue = () => {
        if(currentUser) {
            setNotificationReadValue(currentUser.uid, id, !isRead);
        }
    }

    return (
        <MenuItem className={classes.item}>
                <ListItem className={clsx(classes.notificationItem, isRead ? 'read' : null)}>
                    <Notifications className={clsx(classes.notificationIcon, isRead ? 'read' : null)}/>
                    <div onClick={setNotificationValue} className={classes.notificationText}>
                        <Typography className={classes.notificationTitle} gutterBottom variant="h6">
                            {text}
                        </Typography>
                        <Typography className={classes.notificationCaption} gutterBottom variant="caption">
                            {moment(date.toDate()).calendar()}
                        </Typography>
                    </div>
                </ListItem>
        </MenuItem>
    )
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        item: {
            padding: 0,
        },
        notificationItem: {
            borderBottom: '1px solid #c4c4c4',
            '&.read': {
                backgroundColor: '#e9e9e9',
                transition: 'backgroundColor .3s'
            }
        },
        notificationTitle: {
            height: '55px',
            fontSize: '15px',
            color: '#000000',
            marginBottom: '10px',
        },
        notificationCaption: {
            width: '39px',
            height: '7px',
            fontSize: '12px',
            color: '#acacac',
        },
        notificationIcon: {
            alignSelf: 'start',
            marginRight: '20px',
            color: secondaryColor,
            '&.read': {
                color: '#c4c4c4',
            }
        },
        notificationText: {
            width: '230px',
            whiteSpace: 'pre-wrap',
        }
    })
)