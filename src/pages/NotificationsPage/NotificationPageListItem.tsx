import React from 'react'
import { TableRow, TableCell, makeStyles } from '@material-ui/core'
import { Notifications } from '@material-ui/icons/';
import moment from 'moment'

export type notificationListProps = {
    text: string;
    date: Date;
}

export const NotificationPageListItem = ({ text, date }: notificationListProps) => {
    const classes = useStyles();

    return(
        <TableRow key={text}>
            <TableCell className={classes.text} component="th" scope="row">
                <Notifications className={classes.icon}/>
                {text}
            </TableCell>
            <TableCell>{moment(date).calendar()}</TableCell>
      </TableRow>
    )
}

const useStyles = makeStyles({
    text: {
        color: 'black',
        fontSize: '16px'
    },
    icon: {
        position: 'relative',
        width: '85px'
    }
  });