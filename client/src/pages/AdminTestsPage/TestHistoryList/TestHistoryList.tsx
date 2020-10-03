import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    makeStyles,
    Theme,
    createStyles,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { TestItem } from './TestItem';

export function TestHistoryList() {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>{t('manage-test-view.test-list.name')}</TableCell>
                        <TableCell align="right">{t('manage-test-view.test-list.first-assessment')}</TableCell>
                        <TableCell align="right">{t('manage-test-view.test-list.last-assessment')}</TableCell>
                        <TableCell align="right">{t('manage-test-view.test-list.status')}</TableCell>
                        <TableCell align="right">{t('manage-test-view.test-list.details')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {[].map(row => (
                        <TestItem />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const useStyles = makeStyles((theme: Theme) => createStyles({}));
