import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { TestResultsTableRow } from './TestResultsTableRow';
import { Kindergarten } from '../../graphql/types';

interface Props {
    kindergartens: Kindergarten[];
}

export const TestResultsTable = ({ kindergartens }: Props) => {
    const { t } = useTranslation();

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
                    {kindergartens.map(kindergarten => (
                        <TestResultsTableRow key={kindergarten._id} kindergarten={kindergarten} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
