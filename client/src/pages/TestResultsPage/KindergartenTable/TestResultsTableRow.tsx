import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TableRow, TableCell, IconButton, Tooltip, makeStyles, Theme, alpha } from '@material-ui/core';
import { KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';

import { KindergartenChildrenTable } from './KindergartenChildrenTable';
import { KindergartenWithChildren } from '@app/graphql/types';
import { ProgressBar } from '../../../components/ProgressBar';
import { getMeasurementResult } from '../../../utils/getMeasurementResult';
import { ResultParametersInfo } from './ResultParametersInfo';

interface Props {
    parameterInfo: ResultParametersInfo;
    kindergarten: KindergartenWithChildren;
}

export const TestResultsTableRow = ({ parameterInfo, kindergarten }: Props) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const classes = useStyles({ open });

    const { name, maxResultCount, children: childrenInfo, address } = kindergarten.kindergarten;
    const measurementResult = getMeasurementResult(parameterInfo.measurementType, kindergarten);
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
                <TableCell className={classes.cell}>
                    <div>{name}</div>
                    <div className={classes.helperLabel}>{address}</div>
                </TableCell>
                <TableCell className={classes.cell}>
                    <div className={classes.progressBarContainer}>
                        <div className={classes.progressBar}>
                            <ProgressBar value={(measurementResult / (maxResultCount / 2)) * 100} />
                        </div>
                        <span>
                            {measurementResult} / {maxResultCount / 2}
                        </span>
                    </div>
                </TableCell>
                <TableCell className={classes.cell} />
            </TableRow>
            <KindergartenChildrenTable {...{ open, childrenInfo, parameterInfo }} />
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
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
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
    helperLabel: {
        color: theme.palette.grey['400'],
        marginLeft: theme.spacing(1),
    },
}));
