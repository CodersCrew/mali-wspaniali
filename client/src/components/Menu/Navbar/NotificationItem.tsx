import React from 'react';
import clsx from 'clsx';
import { ListItem, IconButton, Typography, createStyles, makeStyles, MenuItem, Theme } from '@material-ui/core/';
import { Notifications } from '@material-ui/icons/';
import moment from '../../../localizedMoment';
import { darkGrey, notificationCaptionColor } from '../../../colors';

type notificationItemProps = {
    text: string;
    date: string;
    isRead: boolean;
    id: string;
    onClick: (id: string) => void;
};

export const NotificationItem = ({ text, date, isRead, id, onClick }: notificationItemProps) => {
    const classes = useStyles();

    return (
        <MenuItem classes={{ dense: classes.item }} onClick={() => !isRead && onClick(id)}>
            <ListItem classes={{ root: clsx({ [classes.visited]: isRead, [classes.item]: true }) }}>
                <IconButton
                    size="small"
                    onClick={() => !isRead && onClick(id)}
                    classes={{ root: classes.iconButton }}
                    disabled={isRead}
                    color="secondary"
                >
                    <Notifications />
                </IconButton>
                <div className={classes.notificationText}>
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
            cursor: 'default',
        },
        notificationCaption: {
            width: '39px',
            height: '7px',
            color: notificationCaptionColor,
        },

        notificationText: {
            whiteSpace: 'pre-wrap',
        },
        iconButton: {
            margin: theme.spacing(1, 2),
        },
    }),
);
