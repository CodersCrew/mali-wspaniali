import React, { useState } from 'react';
import {
    TableRow,
    TableCell,
    IconButton,
    Fade,
    makeStyles,
    Box,
    Collapse,
    createStyles,
    Theme,
} from '@material-ui/core';
import {
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
    AddCircle as AddIcon,
} from '@material-ui/icons';
import { User } from '../../../graphql/types';

// TODO: adjust fade button behavior

interface Props {
    instructor: User;
    onAssignKindergartenClick: () => void;
}

export const InstructorsTableRow = ({ instructor, onAssignKindergartenClick }: Props) => {
    const [open, setOpen] = useState(false);
    const [showAddButton, setShowAddButton] = useState(false);
    const classes = useStyles();

    const { mail } = instructor;

    return (
        <>
            <TableRow
                className={classes.root}
                onMouseEnter={() => setShowAddButton(true)}
                onMouseLeave={() => setShowAddButton(false)}
            >
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{mail}</TableCell>
                <TableCell>{mail}</TableCell>
                <TableCell>{mail}</TableCell>
                <TableCell align="right" className={classes.kindergartenCell}>
                    <Fade in={showAddButton} mountOnEnter unmountOnExit>
                        <IconButton className={classes.iconButton} onClick={onAssignKindergartenClick}>
                            <AddIcon />
                        </IconButton>
                    </Fade>
                    {!showAddButton && '3'}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className={classes.collapseCell} colSpan={5}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>Some content</Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                borderBottom: 'unset',
            },
        },
        collapseCell: {
            padding: 0,
        },
        kindergartenCell: {
            paddingRight: theme.spacing(10),
        },
        iconButton: {
            padding: 0,
        },
    }),
);
