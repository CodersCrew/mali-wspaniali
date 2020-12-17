import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { TestItem } from './TestItem';
import { BasicTest } from '../../../operations/queries/Assessment/getAllAssessments';

interface Props {
    tests: BasicTest[];
    onTestClick: (type: string, id: string) => void;
}

export function TestHistoryList({ tests, onTestClick }: Props) {
    const { t } = useTranslation();

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>{t('manage-test-view.test-list.name')}</TableCell>
                        <TableCell>{t('manage-test-view.test-list.first-assessment')}</TableCell>
                        <TableCell>{t('manage-test-view.test-list.last-assessment')}</TableCell>
                        <TableCell align="center">{t('manage-test-view.test-list.status')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tests.map((test) => {
                        return <TestItem key={test.title} value={test} onClick={onTestClick} />;
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
