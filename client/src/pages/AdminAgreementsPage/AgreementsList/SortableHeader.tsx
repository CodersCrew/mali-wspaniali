import React from 'react';
import { TableCell, TableRow, Theme, makeStyles, createStyles } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

export function SortableHeader() {
    return (
        <TableRow>
            <TableCell />
            <ArrowedCell text="Nazwa przedszkola" />
            <ArrowedCell text="Ilość zgód wizerunkowych" />
            <ArrowedCell text="Ilość zgód margetingowych" />
            <TableCell component="th" scope="row">
                <span>Statusy</span>
            </TableCell>
        </TableRow>
    );
}

interface ArrowedCellProps {
    text: string;
}

function ArrowedCell({ text }: ArrowedCellProps) {
    const classes = useStyles();

    return (
        <TableCell component="th" scope="row">
            <span className={classes.cellContainer}>
                <ArrowUpwardIcon classes={{ root: classes.arrow }} /> <span>{text}</span>
            </span>
        </TableCell>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cellContainer: {
            display: 'flex',
            alignItems: 'center',
        },
        arrow: {
            color: theme.palette.text.secondary,
            marginRight: theme.spacing(1),
            cursor: 'pointer',
        },
    }),
);
