import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TableRow, TableCell, IconButton, makeStyles, Tooltip, Theme, createStyles, fade } from '@material-ui/core';
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

    const editIconTooltip = t('test-results.edit');

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
                    <Tooltip title={editIconTooltip}>
                        <IconButton
                            className={classes.editButton}
                            size="medium"
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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                borderBottom: 'unset',
            },
        },
        editButton: {
            '&:hover': {
                color: theme.palette.primary.main,
                backgroundColor: fade(theme.palette.primary.main, 0.2),
            },
        },
    }),
);
