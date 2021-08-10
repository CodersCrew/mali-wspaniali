import { useState } from 'react';
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
import { useTranslation } from 'react-i18next';

import { AssessmentItem } from './AssessmentItem';
import { Assessment } from '../../../graphql/types';

interface Props {
    assessments: Assessment[];
    onTestClick: (type: string, id: string) => void;
}

export function AssessmentHistoryList({ assessments, onTestClick }: Props) {
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
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>{t('manage-test-view.test-list.name')}</TableCell>
                        <TableCell />
                        <TableCell>{t('manage-test-view.test-list.first-assessment')}</TableCell>
                        <TableCell />
                        <TableCell>{t('manage-test-view.test-list.last-assessment')}</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? assessments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : assessments
                    ).map((assesment) => {
                        return <AssessmentItem key={assesment.title} value={assesment} onClick={onTestClick} />;
                    })}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                labelRowsPerPage={t('manage-test-view.test-list.rows-number')}
                count={assessments.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}
