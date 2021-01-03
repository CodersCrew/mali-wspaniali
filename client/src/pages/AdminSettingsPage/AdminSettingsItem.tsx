import React, { FC } from 'react';
import clsx from 'clsx';
import { TableRow, TableCell, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

import { User } from '../../graphql/types';

interface AdminSettingsItemProps {
    values: User;
}

export const AdminSettingsItem: FC<AdminSettingsItemProps> = ({ values }) => {
    const classes = useStyles();
    const childrenData = values?.children.map((child, index) => {
        const coma = index < values.children.length - 1 ? ',' : '';
        const childData = `${child.firstname}${child.lastname}${coma} `;

        return childData;
    });

    return (
        <TableRow>
            <TableCell className={clsx(classes.parentEmailColumn, classes.rowText)}>{values.mail}</TableCell>
            <TableCell className={classes.childrenColumn}>
                <Typography className={classes.rowText}>{childrenData}</Typography>
                <div className={classes.actionButtons}>
                    <IconButton
                        size="small"
                        onClick={() => {
                            console.log('do edit actions later');
                        }}
                    >
                        <Edit titleAccess={'Edit'} />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => {
                            console.log('do delete actions later');
                        }}
                    >
                        <DeleteIcon titleAccess={'Delete'} />
                    </IconButton>
                </div>
            </TableCell>
        </TableRow>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    rowText: {
        fontSize: theme.typography.body2.fontSize,
        color: theme.palette.text.primary,
    },
    parentEmailColumn: {
        width: 300,
    },
    childrenColumn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actionButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyItems: 'right',

        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
}));
