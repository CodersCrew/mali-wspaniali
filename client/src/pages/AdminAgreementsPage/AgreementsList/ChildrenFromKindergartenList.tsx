import { useState } from 'react';
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

import { KindergartenWithUsers, User } from '../../../graphql/types';
import { ArrowTooltip } from '../../../components/Tooltip/ArrowTooltip';
import { KindergartenAgreementsList, Parent } from './KindergartenAgreementsList';
import { Status } from '../../../components/Icons/Status';

interface Props {
    kindergarten: KindergartenWithUsers;
    viewAgreement: AgreementResult;
    marketingAgreement: AgreementResult;
}

interface AgreementResult {
    value: number;
    total: number;
}

type AgreementStatus = 'RECIEVED' | 'NOT_RECIEVED';

export function ChildrenFromKindergartenList({ kindergarten, viewAgreement, marketingAgreement }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const classes = useStyles();

    return (
        <>
            <TableRow key={kindergarten.name} classes={{ root: classes.rowContainer }}>
                <TableCell size="small">
                    {kindergarten.users.length > 0 && (
                        <IconButton aria-label="expand row" size="small" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    )}
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
                            <KindergartenAgreementsList
                                parents={mapUsersToAgreemetList(kindergarten.users, kindergarten._id)}
                            />
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

function mapUsersToAgreemetList(users: User[], kindergartenId: string): Parent[] {
    return users.map((u) => {
        return {
            email: u.mail,
            children: u.children
                .filter((c) => c.kindergarten._id === kindergartenId)
                .map((c) => `${c.firstname} ${c.lastname}`),
            viewAgreement: u.agreements.find((a) => a.text === 'Image')!.isSigned,
            marketingAgreement: u.agreements.find((a) => a.text === 'Marketing')!.isSigned,
        };
    });
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(8),
        },
        statusCellRoot: {
            paddingLeft: theme.spacing(2),
        },
        progressbarContainer: {
            display: 'flex',
            alignItems: 'center',
        },
        progressbar: {
            flex: 1,
        },
        progressbarStats: {
            marginLeft: theme.spacing(1),
        },
        progressbarPrimary: {
            background: fade(theme.palette.success.light, 0.24),
        },
        progressbarSecondary: {
            background: theme.palette.success.dark,
        },
        status: {
            display: 'flex',
            alignItems: 'center',
            textTransform: 'uppercase',
            '& > span': {
                marginRight: theme.spacing(1),
            },
        },
        rowContainer: {
            height: 43,
        },
    }),
);
