import React from 'react';
import moment from 'moment';
import { Notifications, Close } from '@material-ui/icons/';
import { ListItem, Typography, createStyles, makeStyles, Theme } from '@material-ui/core/';
import { useTranslation } from 'react-i18next'

type notificationListProps = {
    text: string;
    date: Date;
}

export const NotificationItem = ({ text, date }: notificationListProps) => {
    const classes = useStyles();
    const { i18n } = useTranslation();

    const convertDateToLocale = (date: Date): String => {
        moment().locale(i18n.language)

        return moment(date).calendar().toString()
    } 
    return (
        <ListItem className={classes.notificationItem}>
            <Notifications className={classes.notificationIcon}/>
            <div>
                <Typography className={classes.notificationTitle} gutterBottom variant="h6">
                    {text}
                </Typography>
                <Typography className={classes.notificationCaption} gutterBottom variant="caption">
                    {convertDateToLocale(date)}
                </Typography>
            </div>
            <Close className={classes.notificationIcon}/>
        </ListItem>
    )
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        notificationItem: {
            borderBottom: '1px solid #c4c4c4',
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
            margin: '0 10px',
        }
    })
)