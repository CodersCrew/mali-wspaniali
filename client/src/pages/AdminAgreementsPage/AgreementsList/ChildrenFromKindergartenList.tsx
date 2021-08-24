import { useState } from 'react';
import {
    TableRow,
    TableCell,
    IconButton,
    createStyles,
    makeStyles,
    Theme,
    LinearProgress,
    alpha,
    Collapse,
    Box,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { ArrowTooltip } from '../../../components/Tooltip/ArrowTooltip';
import { KindergartenAgreementsList } from './KindergartenAgreementsList';
import { KindergartenWithChildrens } from '../../../graphql/types';

interface Props {
    kindergarten: KindergartenWithChildrens;
    viewAgreement: AgreementResult;
    marketingAgreement: AgreementResult;
}

interface AgreementResult {
    value: number;
    total: number;
}

export function ChildrenFromKindergartenList({ kindergarten, viewAgreement, marketingAgreement }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const classes = useStyles();

    return (
        <>
            <TableRow key={kindergarten.name} classes={{ root: classes.rowContainer }}>
                <TableCell size="small">
                    {kindergarten.children.length > 0 && (
                        <IconButton aria-label="expand row" size="small" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    )}
                </TableCell>
                <TableCell classes={{ root: classes.root }} size="small">
                    <ArrowTooltip title={`${kindergarten.number}/${kindergarten.name}`}>
                        <span>
                            {kindergarten.number} /{kindergarten.name}
                        </span>
                    </ArrowTooltip>
                </TableCell>
                <TableCell classes={{ root: classes.root }} size="small">
                    <ProgressedCell value={viewAgreement.value} total={viewAgreement.total} />
                </TableCell>
                <TableCell classes={{ root: classes.root }} size="small">
                    <ProgressedCell value={marketingAgreement.value} total={marketingAgreement.total} />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={isOpen}>
                        <Box margin={1} marginRight={11} marginLeft={11}>
                            <KindergartenAgreementsList
                                parents={accumulateChildrenToParents(kindergarten.children, kindergarten._id)}
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

// TO FIX: Issue with agreements view. (Agreements counter shows amount of total agreements/children, not parents)
function accumulateChildrenToParents(users: any[], kindergartenId: string): any[] {
    const parents = users.reduce((acc, child) => {
        if (!child.parent) {
            return { ...acc };
        }

        if(!acc[child.parent.mail]) {
            return {
                ...acc,
                [child.parent.mail]: {
                    __typename: child.parent.__typename,
                    mail: child.parent.mail,
                    agreements: child.parent.agreements,
                    children: [child]
                }
            };
        }

        return { ...acc, ...acc[child.parent.mail].children.push(child) };
    }, {});

    return [...Object.values(parents)];
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
            background: alpha(theme.palette.success.light, 0.24),
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
