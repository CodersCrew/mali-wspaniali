import React from 'react';
import clsx from 'clsx';
import { Notifications } from '@material-ui/icons/';
import { ListItem, Typography, createStyles, makeStyles, MenuItem } from '@material-ui/core/';
import { Timestamp } from '../../firebase/types';
import moment from '../../localizedMoment';
import { useAuthorization } from '../../hooks/useAuthorization';
import { setNotificationReadValue } from '../../queries/notificationQueries';
import { darkGrey, textColor, notificationReadColor, notificationCaptionColor, secondaryColor } from '../../colors';

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

const useStyles = makeStyles(() => 
    createStyles({
        item: {
            padding: 0,
        },
        notificationItem: {
            borderBottom: '1px solid notificationReadColor',
            '&.read': {
                backgroundColor: darkGrey,
                transition: 'backgroundColor .3s'
            }
        },
        notificationTitle: {
            height: '55px',
            fontSize: '15px',
            color: textColor,
            marginBottom: '10px',
        },
        notificationCaption: {
            width: '39px',
            height: '7px',
            fontSize: '12px',
            color: notificationCaptionColor,
        },
        notificationIcon: {
            alignSelf: 'start',
            marginRight: '20px',
            color: secondaryColor,
            '&.read': {
                color: notificationReadColor,
            }
        },
        notificationText: {
            width: '230px',
            whiteSpace: 'pre-wrap',
        }
    })
)