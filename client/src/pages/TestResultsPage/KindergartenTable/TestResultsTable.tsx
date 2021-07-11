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
    IconButton,
} from '@material-ui/core';
import { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { TestResultsTableRow } from './TestResultsTableRow';
import { Kindergarten } from '../../../graphql/types';
import ArrowedCell from '../../../components/ArrowedCell';

const RESULT_CELL_NAME = 'resultCellName';
const KINDERGARTEN_CELL_NAME = 'kindergartenCellName';

interface Props {
    kindergartens: Kindergarten[];
    searchedValue: string;
    onSearchChange: (value: string) => void;
}

export const TestResultsTable = ({ kindergartens, searchedValue, onSearchChange }: Props) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
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
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow className={classes.tableRow}>
                        <TableCell />
                        <ArrowedCell
                            text={t('test-results.kindergarten-name')}
                            isSelected={selectedSortableCell === kindergartenCell.name}
                            onClick={kindergartenCell.changeActive}
                        />
                        <ArrowedCell
                            text={t('test-results.kindergarten-results')}
                            isSelected={selectedSortableCell === resultCell.name}
                            onClick={resultCell.changeActive}
                        />
                        <TableCell className={classes.cell}>
                            <IconButton className={classes.searchIconBtn}>
                                <SearchIcon className={classes.icon} />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? kindergartens.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : kindergartens
                    ).map((kindergarten) => (
                        <TestResultsTableRow key={kindergarten._id} kindergarten={kindergarten} />
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={countRowsPerPageOptions()}
                component="div"
                labelRowsPerPage={t('test-results.rows-number')}
                count={kindergartens.length}
                page={page}
                onChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </TableContainer>
    );

    function handleChangePage(event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    function countRowsPerPageOptions() {
        return [5, 10, 25].filter((v) => kindergartens.length >= v);
    }
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
    }),
);
