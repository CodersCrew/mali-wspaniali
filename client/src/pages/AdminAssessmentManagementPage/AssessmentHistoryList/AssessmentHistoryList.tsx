import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { AssessmentItem } from './AssessmentItem';
import { Assessment } from '../../../graphql/types';

interface Props {
    assessments: Assessment[];
    onTestClick: (type: string, id: string) => void;
}

export function AssessmentHistoryList({ assessments, onTestClick }: Props) {
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
                    {assessments.map((assessment) => {
                        return <AssessmentItem key={assessment.title} value={assessment} onClick={onTestClick} />;
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
