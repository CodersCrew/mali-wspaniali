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
import { Edit as EditIcon, InsertChart as InsertChartIcon } from '@material-ui/icons';
import { useState } from 'react';
import ArrowedCell from '../../../components/ArrowedCell';

interface Props {
    open: boolean;
}

const RESULT_CELL_NAME = 'resultCellName';
const KINDERGARTEN_CELL_NAME = 'kindergartenCellName';

export const KindergartenChildrenTable = ({ open }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const editIconTooltip = t('test-results.button-icon-edit-tooltip');
    const resultsIconTooltip = t('test-results.button-icon-results-tooltip');
    const [selectedSortableCell, setSelectedSortableCell] = useState<string | undefined>(undefined);

    const resultCell = {
        name: RESULT_CELL_NAME,
        changeActive: () =>
            setSelectedSortableCell((prev) => (prev !== RESULT_CELL_NAME ? RESULT_CELL_NAME : undefined)),
    };
    const kindergartenCell = {
        name: KINDERGARTEN_CELL_NAME,
        changeActive: () =>
            setSelectedSortableCell((prev) => (prev !== KINDERGARTEN_CELL_NAME ? KINDERGARTEN_CELL_NAME : undefined)),
    };

    return (
        <TableRow>
            <TableCell className={classes.collapseCell} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box className={classes.collapseContainer}>
                        <Table size="small" aria-label="children">
                            <TableHead>
                                <TableRow className={classes.headRow}>
                                    <ArrowedCell
                                        text={t('test-results.children')}
                                        selectedCellName={selectedSortableCell}
                                        cellName={kindergartenCell.name}
                                        onClick={kindergartenCell.changeActive}
                                        arrowSize="0.85em"
                                    />
                                    <ArrowedCell
                                        text={t('test-results.age')}
                                        selectedCellName={selectedSortableCell}
                                        cellName={resultCell.name}
                                        onClick={resultCell.changeActive}
                                        arrowSize="0.85em"
                                    />
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[1, 2, 3].map((children) => (
                                    <TableRow className={classes.row} key={children}>
                                        <TableCell
                                            className={classes.cell}
                                            component="th"
                                            scope="row"
                                            style={{ width: '46%' }}
                                        >
                                            Małgorzata Pilarczyk
                                        </TableCell>
                                        <TableCell className={classes.cell}>3 lata</TableCell>
                                        <TableCell className={classes.iconCell} align="right">
                                            <Tooltip title={editIconTooltip}>
                                                <IconButton className={classes.button} aria-label="edit child">
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title={resultsIconTooltip}>
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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        collapseCell: {
            padding: 0,
        },
        collapseContainer: {
            margin: '0px 9.6%',
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
            // width: '44%',
        },
        iconCell: {
            padding: theme.spacing(0),
        },
    }),
);
