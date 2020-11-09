import React, { useState } from 'react';
import { TableRow, TableCell, IconButton, makeStyles, Box, Collapse } from '@material-ui/core';
import { KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import { User } from '../../../graphql/types';

interface Props {
    instructor: User;
}

export const InstructorsTableRow = ({ instructor }: Props) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const { mail } = instructor;

    return (
        <>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{mail}</TableCell>
                <TableCell>{mail}</TableCell>
                <TableCell>{mail}</TableCell>
                <TableCell align="right">3</TableCell>
                <TableCell align="right">88</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className={classes.collapseCell} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>Some content</Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

const useStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    collapseCell: {
        padding: 0,
    },
});
