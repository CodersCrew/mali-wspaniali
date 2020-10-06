import React from 'react';
import { createStyles, IconButton, makeStyles, TableCell, TableRow, Theme } from '@material-ui/core';
import { Assessment, Edit, Delete } from '@material-ui/icons';

import { Test } from '../../../graphql/testsRepository';

interface Props {
    value: Test;
    status: JSX.Element;
}

export function TestItem({ value, status }: Props) {
    const classes = useStyles();

    return (
        <TableRow key={value.title}>
            <TableCell component="th" scope="row">
                {value.title}
            </TableCell>
            <TableCell>{value.firstAssessment}</TableCell>
            <TableCell>{value.lastAssessment}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>
                <IconButton size="small">
                    <Assessment classes={{ root: classes.icon }} />
                </IconButton>
            </TableCell>
            <TableCell>
                <IconButton size="small">
                    <Edit classes={{ root: classes.icon }} />
                </IconButton>
                <IconButton size="small">
                    <Delete classes={{ root: classes.icon }} />
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
