import React, { useState, Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { TableRow, TableCell, IconButton, makeStyles } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import EditIcon from '@material-ui/icons/Edit';
import { KindergartenChildrenTable } from './KindergartenChildrenTable';
import { Kindergarten } from '../../graphql/types';

interface Props {
    kindergarten: Kindergarten;
    setCurrentKindergarten: Dispatch<SetStateAction<Kindergarten | null>>;
    setKindergartenModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const TestResultsTableRow = ({ kindergarten, setCurrentKindergarten, setKindergartenModalOpen }: Props) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const { number, name, address, city } = kindergarten;

    return (
        <>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {`${t('test-results.kindergarten-prefix')} ${number}`}
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{`${address}, ${city}`}</TableCell>
                <TableCell align="right">
                    <IconButton
                        aria-label="edit kindergarten"
                        size="small"
                        onClick={() => {
                            setCurrentKindergarten(kindergarten);
                            setKindergartenModalOpen(true);
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            <KindergartenChildrenTable open={open} />
        </>
    );
};

const useStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});
