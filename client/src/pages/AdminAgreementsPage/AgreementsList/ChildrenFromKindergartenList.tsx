import React, { useState } from 'react';
import {
    TableRow,
    TableCell,
    IconButton,
    createStyles,
    makeStyles,
    Theme,
    LinearProgress,
    fade,
    Collapse,
    Box,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { Kindergarten } from '../../../graphql/types';
import { ArrowTooltip } from '../../../components/Tooltip/ArrowTooltip';
import { KindergartenAgreementsList } from './KindergartenAgreementsList';
import { Status } from '../../../components/Icons/Status';

interface Props {
    kindergarten: Kindergarten;
    viewAgreement: AgreementResult;
    marketingAgreement: AgreementResult;
}

interface AgreementResult {
    value: number;
    total: number;
}

type AgreementStatus = 'RECIEVED' | 'NOT_RECIEVED';

const PARENT_LIST = [
    {
        email: 'abc',
        children: ['abc', 'cde'],
        marketingAgreement: true,
        viewAgreement: false,
    },
    {
        email: 'abc2',
        children: ['abc', 'cde'],
        marketingAgreement: true,
        viewAgreement: false,
    },
    {
        email: 'abc3',
        children: ['abc'],
        marketingAgreement: true,
        viewAgreement: false,
    },
    {
        email: 'abc4',
        children: ['abc'],
        marketingAgreement: true,
        viewAgreement: false,
    },
];

export function ChildrenFromKindergartenList({ kindergarten, viewAgreement, marketingAgreement }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const classes = useStyles();

    return (
        <>
            <TableRow key={kindergarten.name}>
                <TableCell size="small">
                    <IconButton aria-label="expand row" size="small" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell classes={{ root: classes.root }} size="small">
                    <ArrowTooltip title={`${kindergarten.number}/${kindergarten.name}`}>
                        <span>
                            {kindergarten.number}/{kindergarten.name.slice(0, 15)}
                        </span>
                    </ArrowTooltip>
                </TableCell>
                <TableCell classes={{ root: classes.root }} size="small">
                    <ProgressedCell value={viewAgreement.value} total={viewAgreement.total} />
                </TableCell>
                <TableCell classes={{ root: classes.root }} size="small">
                    <ProgressedCell value={marketingAgreement.value} total={marketingAgreement.total} />
                </TableCell>
                <TableCell classes={{ root: classes.statusCellRoot }} size="small">
                    <StatusCell status={countStatus(viewAgreement, marketingAgreement)} />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={isOpen}>
                        <Box margin={1} marginRight={11} marginLeft={11}>
                            <KindergartenAgreementsList parents={PARENT_LIST} />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

interface ProgressedCellProps {
    value: number;
    total: number;
}
function ProgressedCell({ value, total }: ProgressedCellProps) {
    const classes = useStyles();

    return (
        <span className={classes.progressbarContainer}>
            <LinearProgress
                classes={{
                    root: classes.progressbar,
                    determinate: classes.progressbarPrimary,
                    bar1Determinate: classes.progressbarSecondary,
                }}
                variant="determinate"
                value={(value * 100) / total}
            />
            <span className={classes.progressbarStats}>
                {value}/{total}
            </span>
        </span>
    );
}

interface StatusCellProps {
    status: 'RECIEVED' | 'NOT_RECIEVED';
}

function StatusCell({ status }: StatusCellProps) {
    if (status === 'RECIEVED') return <Recieved />;

    return <NotRecieved />;
}

function Recieved() {
    const classes = useStyles();

    return (
        <span className={classes.status}>
            <span>
                <Status success />
            </span>
            <span>Oddane</span>
        </span>
    );
}

function NotRecieved() {
    const classes = useStyles();

    return (
        <span className={classes.status}>
            <span>
                <Status />
            </span>
            <span>Nieoddane</span>
        </span>
    );
}

function countStatus(agreementResultA: AgreementResult, agreementResultB: AgreementResult): AgreementStatus {
    const results = [
        agreementResultA.value === agreementResultA.total ? 'RECIEVED' : 'NOT_RECIEVED',
        agreementResultB.value === agreementResultB.total ? 'RECIEVED' : 'NOT_RECIEVED',
    ];

    return results.includes('RECIEVED') ? 'RECIEVED' : 'NOT_RECIEVED';
}

const useStyles = makeStyles((ttheme: Theme) =>
    createStyles({
        root: {
            paddingLeft: ttheme.spacing(6),
        },
        statusCellRoot: {
            paddingLeft: ttheme.spacing(2),
        },
        progressbarContainer: {
            display: 'flex',
            alignItems: 'center',
        },
        progressbar: {
            flex: 1,
        },
        progressbarStats: {
            marginLeft: ttheme.spacing(1),
        },
        progressbarPrimary: {
            background: fade(ttheme.palette.success.light, 0.24),
        },
        progressbarSecondary: {
            background: ttheme.palette.success.dark,
        },
        status: {
            display: 'flex',
            alignItems: 'center',
            textTransform: 'uppercase',
            '& > span': {
                marginRight: ttheme.spacing(1),
            },
        },
    }),
);
