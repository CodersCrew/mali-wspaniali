import React from 'react';
import clsx from 'clsx';
import { Notifications } from '@material-ui/icons/';
import { ListItem, Typography, createStyles, makeStyles, MenuItem } from '@material-ui/core/';
import moment from '../../../localizedMoment';
import { darkGrey, textColor, notificationReadColor, notificationCaptionColor, secondaryColor } from '../../../colors';

type notificationItemProps = {
    text: string;
    date: string;
    isRead: boolean;
    id: string;
};

export const NotificationItem = ({ text, date, isRead, id }: notificationItemProps) => {
    const classes = useStyles();

    const setNotificationValue = () => {
        // todo
    };

    return (
        <MenuItem className={classes.item}>
            <ListItem className={clsx({ [classes.notificationItem]: true, read: isRead })}>
                <Notifications className={clsx({ [classes.notificationIcon]: true, read: isRead })} />
                <div onClick={setNotificationValue} className={classes.notificationText}>
                    <Typography className={classes.notificationTitle} gutterBottom variant="body1">
                        {text}
                    </Typography>
                    <Typography className={classes.notificationCaption} gutterBottom variant="caption">
                        {moment(date).calendar()}
                    </Typography>
                </div>
            </ListItem>
        </MenuItem>
    );
};

const useStyles = makeStyles(() =>
    createStyles({
        item: {
            padding: 0,
        },
        notificationItem: {
            borderBottom: '1px solid notificationReadColor',
            '&.read': {
                backgroundColor: darkGrey,
                transition: 'backgroundColor .3s',
            },
        },
        notificationTitle: {
            height: '55px',
            color: textColor,
            marginBottom: '10px',
        },
        notificationCaption: {
            width: '39px',
            height: '7px',
            color: notificationCaptionColor,
        },
        notificationIcon: {
            alignSelf: 'start',
            marginRight: '20px',
            color: secondaryColor,
            '&.read': {
                color: notificationReadColor,
            },
        },
        notificationText: {
            width: '230px',
            whiteSpace: 'pre-wrap',
        },
    }),
);
