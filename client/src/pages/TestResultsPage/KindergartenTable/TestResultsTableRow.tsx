import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { TableRow, TableCell, IconButton, Tooltip, makeStyles, Theme, fade } from '@material-ui/core';
import {
    Edit as EditIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@material-ui/icons';
import { KindergartenChildrenTable } from './KindergartenChildrenTable';
import { Kindergarten } from '../../../graphql/types';
import { ProgressBar } from '../../../components/ProgressBar';

interface Props {
    kindergarten: Kindergarten;
    onEditClick: (value: Kindergarten) => void;
}

export const TestResultsTableRow = ({ kindergarten, onEditClick }: Props) => {
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const { name } = kindergarten;
    const editIconTooltip = t('test-results.button-icon-edit-tooltip');
    const expandIconTooltip = t('test-results.button-icon-expand-tooltip');

    console.log('gard', kindergarten);

    return (
        <>
            <TableRow className={classes.root} onClick={() => setOpen((prev) => !prev)}>
                <TableCell>
                    <Tooltip title={expandIconTooltip}>
                        <IconButton size="small" aria-label="expand row">
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </Tooltip>
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>
                    <div className={classes.progressBar}>
                        <ProgressBar value={(200 / 300) * 100} />
                        <span> 200 / 300</span>
                    </div>
                </TableCell>
                <TableCell align="right">
                    <Tooltip title={editIconTooltip}>
                        <IconButton
                            className={classes.button}
                            aria-label="edit kindergarten"
                            size="small"
                            onClick={onEditButtonClick}
                        >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
            <KindergartenChildrenTable open={open} />
        </>
    );

    function onEditButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();

        onEditClick(kindergarten);
    }
};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
        '&:hover': {
            backgroundColor: theme.palette.background.default,
        },
        cursor: 'pointer',
    },
    button: {
        '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: fade(theme.palette.primary.main, 0.2),
        },
    },
    progressBar: {
        display: 'blok',
        flexDirection: 'row',
        borderWidth: '2px',
        borderColor: 'red',
    },
}));
