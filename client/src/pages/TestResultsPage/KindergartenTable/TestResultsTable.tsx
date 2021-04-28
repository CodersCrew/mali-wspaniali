import { useState } from 'react';
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
} from '@material-ui/core';
import { TestResultsTableRow } from './TestResultsTableRow';
import { Kindergarten } from '../../../graphql/types';

interface Props {
    kindergartens: Kindergarten[];
    onEditClick: (value: Kindergarten) => void;
}

export const TestResultsTable = ({ kindergartens, onEditClick }: Props) => {
    const { t } = useTranslation();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>{t('test-results.kindergarten-number')}</TableCell>
                        <TableCell>{t('test-results.kindergarten-name')}</TableCell>
                        <TableCell>{t('test-results.kindergarten-address')}</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? kindergartens.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : kindergartens
                    ).map((kindergarten) => (
                        <TestResultsTableRow
                            key={kindergarten._id}
                            kindergarten={kindergarten}
                            onEditClick={onEditClick}
                        />
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
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
};
