import { MouseEvent as ReactMouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    makeStyles,
    Theme,
    createStyles,
} from '@material-ui/core';

import { KindergartenWithChildren } from '@app/graphql/types';

import { TestResultsTableRow } from './TestResultsTableRow';
import { MeasurementType } from '../TestToggleButton';

interface Props {
    assessmentId: string;
    measurementType: MeasurementType;
    kindergartens: KindergartenWithChildren[];
    page: number;
    setPage: (value: number) => void;
}

export const TestResultsTable = ({ assessmentId, measurementType, kindergartens, page, setPage }: Props) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const displayedKindergartens = kindergartens.map((k) => ({
        ...k.kindergarten,
        children: k.kindergarten.children,
    }));

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow className={classes.tableRow}>
                        <TableCell style={{ width: '82px' }} />
                        <TableCell component="th" scope="row" padding="none">
                            <span className={classes.cellContainer}> {t('test-results.kindergarten-name')}</span>
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                            <span className={classes.cellContainer}> {t('test-results.kindergarten-results')}</span>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {displayedKindergartens.map((kindergarten) => (
                        <TestResultsTableRow
                            key={kindergarten._id}
                            kindergarten={{ kindergarten }}
                            parameterInfo={{
                                measurementType,
                                assessmentId,
                                kindergartenId: kindergarten._id,
                            }}
                        />
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[10]}
                component="div"
                labelRowsPerPage={t('test-results.rows-number')}
                count={-1}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={10}
            />
        </TableContainer>
    );

    function handleChangePage(event: ReactMouseEvent<HTMLButtonElement> | null, newPage: number) {
        setPage(newPage);
    }
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cellContainer: {
            display: 'flex',
            alignItems: 'center',
            userSelect: 'none',
            margin: '0px 4px',
        },
        tableRow: {
            height: '50px',
        },
        searchIconBtn: {
            padding: '3px',
            color: 'gray',
        },
        icon: {
            width: '30px',
            height: '30px',
        },
        cell: {
            padding: theme.spacing(0),
        },
        searchCell: {
            borderBottom: 'none',
            padding: 0,
        },
        searchInput: {
            margin: theme.spacing(2),
        },
    }),
);
