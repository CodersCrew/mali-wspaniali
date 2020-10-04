import React from 'react';
import clsx from 'clsx';
import { Notifications } from '@material-ui/icons/';
import { ListItem, Typography, createStyles, makeStyles, MenuItem, Theme } from '@material-ui/core/';
import moment from '../../../localizedMoment';
import { darkGrey, notificationCaptionColor } from '../../../colors';

type notificationItemProps = {
    text: string;
    date: string;
    isRead: boolean;
    id: string;
};

export const NotificationItem = ({ text, date, isRead }: notificationItemProps) => {
    const classes = useStyles();

    const setNotificationValue = () => {
        // todo
    };

    return (
        <MenuItem classes={{ dense: classes.item }}>
            <ListItem className={clsx({ [classes.visited]: isRead })} classes={{ root: classes.item }}>
                <Notifications
                    className={clsx({ [classes.notificationIcon]: true, [classes.notificationIconRead]: isRead })}
                />
                <div onClick={setNotificationValue} className={classes.notificationText}>
                    <div>
                        <Typography gutterBottom variant="caption">
                            {text}
                        </Typography>
                    </div>
                    <div>
                        <Typography className={classes.notificationCaption} gutterBottom variant="caption">
                            {moment(date).calendar()}
                        </Typography>
                    </div>
                </div>
            </ListItem>
        </MenuItem>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        item: {
            padding: 0,
        },
        notificationItem: {
            borderBottom: '1px solid notificationReadColor',
            paddingRight: theme.spacing(2),
            '&.read': {
                backgroundColor: darkGrey,
                transition: 'backgroundColor .3s',
            },
        },
        visited: {
            background: theme.palette.background.default,
            transition: 'backgroundColor .3s',
        },

        notificationIconRead: {
            color: theme.palette.background.default,
        },
        notificationCaption: {
            width: '39px',
            height: '7px',
            color: notificationCaptionColor,
        },
        notificationIcon: {
            alignSelf: 'start',
            margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
            color: theme.palette.secondary.main,
        },
        notificationText: {
            whiteSpace: 'pre-wrap',
        },
    }),
);
