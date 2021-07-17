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
    fade,
    Tooltip,
} from '@material-ui/core';
import { InsertChart as InsertChartIcon, Edit as EditIcon } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import ArrowedCell, { useArrowedCell } from '../../../components/ArrowedCell';
import { BaseChildInfo } from '../../../graphql/types';
import { ResultParametersInfo } from './ResultParametersInfo';

interface Props {
    open: boolean;
    childrenInfo: BaseChildInfo[];
    parameterInfo: ResultParametersInfo;
}

const CHILD_NAME = 'childName';
const AGE_NAME = 'AgeName';

export const KindergartenChildrenTable = ({ parameterInfo, open, childrenInfo }: Props) => {
    const classes = useStyles({ open });
    const { t } = useTranslation();
    const history = useHistory<object>();
    const [children, selectedSortableCell, cellParameters] = useArrowedCell(childrenInfo);

    const childCell = cellParameters(
        CHILD_NAME,
        (c: BaseChildInfo, b: BaseChildInfo) => `${c.firstname} ${c.lastname}` < `${b.firstname} ${b.lastname}`,
    );
    const ageCell = cellParameters(AGE_NAME, (c: BaseChildInfo, b: BaseChildInfo) => (c.age ?? 0) < (b.age ?? 0));

    const onEditChildInfo = (childId: string) => {
        const { measurementType, assessmentId, kindergartenId } = parameterInfo;
        const actualPath = history.location.pathname;
        const actualState = history.location.state;
        console.log('his', history);

        history.push({
            pathname: `/instructor/result/add/${measurementType}/${assessmentId}/${kindergartenId}/${childId}`,
            state: {
                ...actualState,
                sourcePage: actualPath,
            },
        });
    };

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
                                {children.map((child) => (
                                    <TableRow className={classes.row} key={child._id}>
                                        <TableCell
                                            className={classes.cell}
                                            component="th"
                                            scope="row"
                                            style={{ width: '46%' }}
                                        >
                                            {child.firstname} {child.lastname}
                                        </TableCell>
                                        <TableCell className={classes.cell}>
                                            {child.age} {t('years_1')}
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
                                            <Tooltip title={t('test-results.button-icon-results-tooltip').toString()}>
                                                <IconButton className={classes.button} aria-label="view results">
                                                    <InsertChartIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
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
                backgroundColor: fade(theme.palette.primary.main, 0.2),
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
