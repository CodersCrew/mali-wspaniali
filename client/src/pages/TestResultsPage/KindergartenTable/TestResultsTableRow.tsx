import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TableRow, TableCell, IconButton, makeStyles, Theme, fade, Tooltip } from '@material-ui/core';
import {
    Edit as EditIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@material-ui/icons';
import { KindergartenChildrenTable } from './KindergartenChildrenTable';
import { Kindergarten } from '../../../graphql/types';

interface Props {
    kindergarten: Kindergarten;
    onEditClick: (value: Kindergarten) => void;
}

export const TestResultsTableRow = ({ kindergarten, onEditClick }: Props) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const { number, name, address, city } = kindergarten;
    const editIconTooltip = t('test-results.button-icon-edit-tooltip');
    const expandIconTooltip = t('test-results.button-icon-expand-tooltip');

    return (
        <>
            <TableRow className={classes.root}>
                <TableCell>
                <Tooltip title={expandIconTooltip}>
                    <IconButton
                        className={classes.button}
                        aria-label="expand row"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </Tooltip>
                </TableCell>
                <TableCell component="th" scope="row">
                    {`${t('test-results.kindergarten-prefix')} ${number}`}
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{`${address}, ${city}`}</TableCell>
                <TableCell align="right">
                <Tooltip title={editIconTooltip}>
                    <IconButton
                        className={classes.button}
                        aria-label="edit kindergarten"
                        onClick={() => onEditClick(kindergarten)}
                    >
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                </TableCell>
            </TableRow>
            <KindergartenChildrenTable open={open} />
        </>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    button: {
        '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: fade(theme.palette.primary.main, 0.2),
        },
    },
}));
