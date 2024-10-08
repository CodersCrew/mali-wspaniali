import { useTranslation } from 'react-i18next';
import {
    TableRow,
    TableCell,
    Collapse,
    Box,
    Table,
    TableHead,
    TableBody,
    IconButton,
    createStyles,
    makeStyles,
    Theme,
    alpha,
    Tooltip,
} from '@material-ui/core';
import { InsertChart as InsertChartIcon, Edit as EditIcon } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';

import ArrowedCell, { useArrowedCell } from '@app/components/ArrowedCell';
import { BaseChildInfo } from '@app/graphql/types';
import { useAssessmentResults } from '@app/operations/queries/Results/getAssessmentResults';

import { getQuarter, parseToDetailedAge } from '@app/utils/parseDateToAge';
import { useEffect } from 'react';
import { ResultParametersInfo } from './ResultParametersInfo';

interface Props {
    open: boolean;
    childrenInfo: BaseChildInfo[];
    parameterInfo: ResultParametersInfo;
}

const CHILD_NAME = 'childName';
const AGE_NAME = 'AgeName';

export const KindergartenChildrenTable = ({ parameterInfo, open, childrenInfo }: Props) => {
    const { measurementType, assessmentId, kindergartenId } = parameterInfo;
    const classes = useStyles({ open });
    const {
        t,
        i18n: { language },
    } = useTranslation();
    const history = useHistory<object>();
    const [children, selectedSortableCell, cellParameters] = useArrowedCell(childrenInfo);
    const { kindergartenResults } = useAssessmentResults(kindergartenId, assessmentId);

    const collator = new Intl.Collator('pl', { sensitivity: 'base' });

    const childCell = cellParameters(
        CHILD_NAME,
        (c: BaseChildInfo, b: BaseChildInfo) =>
            collator.compare(
                `${c.lastname}, ${c.firstname}`.toLowerCase(),
                `${b.lastname}, ${b.firstname}`.toLowerCase(),
            ) * (selectedSortableCell === childCell.name ? -1 : 1),
    );
    const ageCell = cellParameters(
        AGE_NAME,
        (c: BaseChildInfo, b: BaseChildInfo) =>
            collator.compare(String(c.age ?? 0), String(b.age ?? 0)) * (selectedSortableCell === ageCell.name ? -1 : 1),
    );

    const onEditChildInfo = (childId: string) => {
        const actualPath = history.location.pathname;
        const actualState = history.location.state;

        history.push({
            pathname: `/instructor/result/add/${measurementType}/${assessmentId}/${kindergartenId}/all/${childId}`,
            state: {
                ...actualState,
                sourcePageInfo: {
                    actualPath,
                    backBtnName: 'back-to-results',
                },
            },
        });
    };

    useEffect(() => {
        childCell.setActive();
    }, []);

    return (
        <TableRow className={classes.mainRow}>
            <TableCell className={classes.collapseCell} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box className={classes.collapseContainer}>
                        <Table size="small" aria-label="children">
                            <TableHead>
                                <TableRow className={classes.headRow}>
                                    <ArrowedCell
                                        text={t('test-results.children')}
                                        isSelected={selectedSortableCell === childCell.name}
                                        onClick={childCell.changeActive}
                                        arrowSize="0.85em"
                                    />

                                    <ArrowedCell
                                        text={t('test-results.age')}
                                        isSelected={selectedSortableCell === ageCell.name}
                                        onClick={ageCell.changeActive}
                                        arrowSize="0.85em"
                                    />

                                    <TableCell />
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {children.map((child) => {
                                    const result = kindergartenResults.find((r) => r.childId === child._id);
                                    const realAge = parseToDetailedAge(child.birthYear, child.birthQuarter);
                                    const assessmentStartDate =
                                        parameterInfo.assessment.firstMeasurementStartDate ||
                                        parameterInfo.assessment.lastMeasurementStartDate;
                                    const assessmentAge = parseToDetailedAge(
                                        child.birthYear,
                                        child.birthQuarter,
                                        new Date(assessmentStartDate),
                                    );

                                    return (
                                        <TableRow className={classes.row} key={child._id}>
                                            <TableCell
                                                className={classes.cell}
                                                component="th"
                                                scope="row"
                                                style={{ width: '46%' }}
                                            >
                                                {`${child.lastname}, ${child.firstname}`}
                                            </TableCell>

                                            <TableCell className={classes.cell}>
                                                <Tooltip
                                                    title={
                                                        <div>
                                                            <div>
                                                                {t('test-results.age-description.age-in-test', {
                                                                    age: assessmentAge[0],
                                                                    q: assessmentAge[1],
                                                                })}
                                                            </div>

                                                            <div>
                                                                {t('test-results.age-description.current-age', {
                                                                    age: realAge[0],
                                                                    q: realAge[1],
                                                                })}
                                                            </div>

                                                            <div>
                                                                {t('test-results.age-description.dob', {
                                                                    year: child.birthYear,
                                                                    q: child.birthQuarter,
                                                                })}
                                                            </div>

                                                            <div>
                                                                {t('test-results.age-description.current-date', {
                                                                    year: new Date().getFullYear(),
                                                                    q: getQuarter(),
                                                                })}
                                                            </div>
                                                        </div>
                                                    }
                                                >
                                                    <span>
                                                        {language === 'en'
                                                            ? ` ${child.age || ''} ${t('years_2')}`
                                                            : `${t('years_2')} ${child.age || ''}`}
                                                    </span>
                                                </Tooltip>
                                            </TableCell>

                                            <TableCell className={classes.iconCell} align="right">
                                                <Tooltip title={t('test-results.edit').toString()}>
                                                    <IconButton
                                                        onClick={() => onEditChildInfo(child._id)}
                                                        className={classes.button}
                                                        aria-label="view results"
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>

                                                {result && (
                                                    <Link to={`/instructor/results/${result._id}`}>
                                                        <Tooltip
                                                            title={t(
                                                                'test-results.button-icon-results-tooltip',
                                                            ).toString()}
                                                        >
                                                            <IconButton
                                                                className={classes.button}
                                                                aria-label="view results"
                                                            >
                                                                <InsertChartIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Link>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    );
};

type PropStyle = {
    open: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        collapseCell: {
            padding: 0,
            borderBottom: 'none',
        },
        collapseContainer: {
            margin: '0px 9.6%',
            paddingBottom: '8px',
        },
        button: {
            '&:hover': {
                color: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
            },
            marginRight: theme.spacing(1),
            padding: theme.spacing(0),
        },
        headRow: {
            height: '34px',
        },
        mainRow: {
            borderBottom: ({ open }: PropStyle) => (open ? '1px solid rgba(224, 224, 224, 1)' : 'none'),
        },
        row: {
            '&:hover': {
                backgroundColor: theme.palette.background.default,
            },
            height: '34px',
            padding: '0px auto',
            left: '4px',
        },
        cell: {
            padding: theme.spacing(0),
            paddingLeft: '6px',
        },
        iconCell: {
            padding: theme.spacing(0),
        },
    }),
);
