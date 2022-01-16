import { MouseEvent as ReactMouseEvent, ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    TablePagination,
} from '@material-ui/core';
import { KindergartensTableRow } from './KindergartensTableRow';
import { Kindergarten } from '../../../graphql/types';

interface Props {
    kindergartens: Kindergarten[];
    onEditClick: (value: Kindergarten) => void;
}

export const KindergartensTable = ({ kindergartens, onEditClick }: Props) => {
    const { t } = useTranslation();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    return (
        <TableContainer component={Box}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
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
                        <KindergartensTableRow
                            key={kindergarten._id}
                            kindergarten={kindergarten}
                            onEditClick={onEditClick}
                        />
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={countRowsPerPageOptions()}
                component="div"
                labelRowsPerPage={t('test-results.rows-number')}
                count={kindergartens.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </TableContainer>
    );

    function handleChangePage(event: ReactMouseEvent<HTMLButtonElement> | null, newPage: number) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    function countRowsPerPageOptions() {
        return [5, 10, 25].filter((v) => kindergartens.length >= v);
    }
};
