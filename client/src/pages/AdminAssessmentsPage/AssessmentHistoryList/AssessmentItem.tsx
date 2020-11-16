import React from 'react';
import { createStyles, IconButton, makeStyles, TableCell, TableRow, Theme } from '@material-ui/core';
import { Assessment as AssessmentIcon, Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';

import { Assessment } from '../../../graphql/types';

interface Props {
    value: Assessment;
    status: JSX.Element;
}

export function AssessmentItem({ value, status }: Props) {
    const classes = useStyles();

    return (
        <TableRow key={value.title}>
            <TableCell component="th" scope="row">
                {value.title}
            </TableCell>
            <TableCell>{value.startDate}</TableCell>
            <TableCell>{value.endDate}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>
                <IconButton size="small">
                    <AssessmentIcon classes={{ root: classes.icon }} />
                </IconButton>
            </TableCell>
            <TableCell>
                <IconButton size="small">
                    <EditIcon classes={{ root: classes.icon }} />
                </IconButton>
                <IconButton size="small">
                    <DeleteIcon classes={{ root: classes.icon }} />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            color: theme.palette.text.secondary,
        },
    }),
);
