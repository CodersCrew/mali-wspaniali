import { useTranslation } from 'react-i18next';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Collapse,
    TablePagination,
    makeStyles,
    Theme,
    createStyles,
    IconButton,
    Tooltip,
} from '@material-ui/core';
import { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { TestResultsTableRow } from './TestResultsTableRow';
import { BaseChildInfo, KindergartenWithChildren } from '../../../graphql/types';
import ArrowedCell, { useArrowedCell } from '../../../components/ArrowedCell';
import { AssessmentType } from '../TestToggleButton';
import { Input } from '../../../components/ChildForm/Input';
import { getMeasurementResult } from '../../../utils/getMeasurementResult';

const RESULT_CELL_NAME = 'resultCellName';
const KINDERGARTEN_CELL_NAME = 'kindergartenCellName';

interface Props {
    assessmentType: AssessmentType;
    kindergartens: KindergartenWithChildren[];
    searchedValue: string;
    onSearchChange: (value: string) => void;
}

export const TestResultsTable = ({ assessmentType, kindergartens, searchedValue, onSearchChange }: Props) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [searchOpened, setSearchOpened] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedKindergartens, selectedSortableCell, cellParameters] = useArrowedCell(kindergartens);

    const searchChildren = (child: BaseChildInfo) =>
        `${child.firstname} ${child.lastname}`.toLocaleLowerCase().includes(searchedValue.toLocaleLowerCase());

    const displayedKindergartens = [
        ...selectedKindergartens
            .map((k) => ({
                ...k.kindergarten,
                children: k.kindergarten.children.filter(searchChildren),
            }))
            .filter((k) => k.children.length > 0),
    ];
    const resultCell = cellParameters(RESULT_CELL_NAME, (c, b) => {
        const getResult = (kindergarten: KindergartenWithChildren) =>
            getMeasurementResult(assessmentType, kindergarten);

        return getResult(c) / c.kindergarten.maxResultCount < getResult(b) / c.kindergarten.maxResultCount;
    });
    const kindergartenCell = cellParameters(
        KINDERGARTEN_CELL_NAME,
        (c, b) => c.kindergarten.name < b.kindergarten.name,
    );

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow className={classes.tableRow}>
                        <TableCell style={{ width: '82px' }} />
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
                            <Tooltip title={t('add-test-view.basic-information-form.search').toString()}>
                                <IconButton
                                    className={classes.searchIconBtn}
                                    onClick={() => setSearchOpened(!searchOpened)}
                                >
                                    <SearchIcon className={classes.icon} />
                                </IconButton>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={4} className={classes.searchCell}>
                            <Collapse in={searchOpened} timeout="auto" unmountOnExit>
                                <div className={classes.searchInput}>
                                    <Input
                                        label={t('test-results.filter-children-label')}
                                        value={searchedValue}
                                        onChange={(name, value) => onSearchChange(value)}
                                        name="search"
                                        error="error"
                                    />
                                </div>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </TableBody>
                <TableBody>
                    {(rowsPerPage > 0
                        ? displayedKindergartens.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : displayedKindergartens
                    ).map((kindergarten) => (
                        <TestResultsTableRow
                            key={kindergarten._id}
                            kindergarten={{ kindergarten }}
                            assessmentType={assessmentType}
                        />
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={countRowsPerPageOptions()}
                component="div"
                labelRowsPerPage={t('test-results.rows-number')}
                count={displayedKindergartens.length}
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
        searchCell: {
            borderBottom: 'none',
            padding: 0,
        },
        searchInput: {
            margin: theme.spacing(2),
        },
    }),
);
