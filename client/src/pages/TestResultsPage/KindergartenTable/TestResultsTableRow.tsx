import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { TableRow, TableCell, IconButton, Tooltip, makeStyles, Theme, fade } from '@material-ui/core';
import { KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import { KindergartenChildrenTable } from './KindergartenChildrenTable';
import { Kindergarten } from '../../../graphql/types';
import { ProgressBar } from '../../../components/ProgressBar';

interface Props {
    kindergarten: Kindergarten;
    onEditClick?: (value: Kindergarten) => void;
}

export const TestResultsTableRow = ({ kindergarten, onEditClick }: Props) => {
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const classes = useStyles({ open });

    const { name } = kindergarten;
    const expandIconTooltip = t('test-results.button-icon-expand-tooltip');

    return (
        <>
            <TableRow className={classes.root} onClick={() => setOpen((prev) => !prev)}>
                <TableCell className={classes.cell}>
                    <Tooltip title={expandIconTooltip}>
                        <IconButton size="small" aria-label="expand row">
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </Tooltip>
                </TableCell>
                <TableCell className={classes.cell}>{name}</TableCell>
                <TableCell className={classes.cell}>
                    <div className={classes.progressBarContainer}>
                        <div className={classes.progressBar}>
                            <ProgressBar value={(200 / 300) * 100} />
                        </div>
                        <span> 200 / 300</span>
                    </div>
                </TableCell>
                <TableCell className={classes.cell} />
            </TableRow>
            {<KindergartenChildrenTable open={open} />}
        </>
    );
};

type PropStyle = {
    open: boolean;
};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        '&:hover': {
            backgroundColor: theme.palette.background.default,
        },
        cursor: 'pointer',
        height: '50px',
        borderBottom: ({ open }: PropStyle) => (!open ? '1px solid rgba(224, 224, 224, 1)' : 'none'),
    },
    button: {
        '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: fade(theme.palette.primary.main, 0.2),
        },
    },
    progressBarContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressBar: {
        width: '70%',
        marginRight: theme.spacing(2),
    },
    cell: {
        padding: theme.spacing(1),
        borderBottom: 'none',
    },
}));
