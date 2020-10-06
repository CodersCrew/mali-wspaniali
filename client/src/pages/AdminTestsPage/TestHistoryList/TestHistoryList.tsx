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
    Chip,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { TestItem } from './TestItem';
import { Test } from '../../../graphql/testsRepository';

const testList: Test[] = [
    {
        title: 'Test1',
        firstAssessment: new Date().toUTCString(),
        lastAssessment: new Date().toUTCString(),
        status: 'active',
    },
    {
        title: 'Test2',
        firstAssessment: new Date().toUTCString(),
        lastAssessment: new Date().toUTCString(),
        status: 'done',
    },
];

export function TestHistoryList() {
    const { t } = useTranslation();

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>{t('manage-test-view.test-list.name')}</TableCell>
                        <TableCell>{t('manage-test-view.test-list.first-assessment')}</TableCell>
                        <TableCell>{t('manage-test-view.test-list.last-assessment')}</TableCell>
                        <TableCell>{t('manage-test-view.test-list.status')}</TableCell>
                        <TableCell>{t('manage-test-view.test-list.details')}</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {testList.map(test => (
                        <TestItem key={test.title} value={test} status={<Status value={test.status} />} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function Status({ value }: { value: string }) {
    const classes = useStyles();
    const { t } = useTranslation();

    if (value === 'active')
        return (
            <Chip
                size="small"
                label={t('manage-test-view.test-list.active')}
                classes={{ root: classes.successLabel }}
            />
        );

    if (value === 'done')
        return <Chip size="small" label={t('manage-test-view.test-list.done')} classes={{ root: classes.doneLabel }} />;

    return null;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        successLabel: {
            color: theme.palette.secondary.contrastText,
            background: theme.palette.success.main,
        },
        doneLabel: {
            background: theme.palette.grey[300],
        },
    }),
);
