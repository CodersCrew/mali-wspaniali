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
import { Test } from '../../../graphql/types';

interface Props {
    tests: Test[];
}

export function TestHistoryList({ tests }: Props) {
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
                    {tests.map(test => (
                        <TestItem key={test.title} value={test} status={<Status value={!test.isOutdated} />} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function Status({ value }: { value: boolean }) {
    const classes = useStyles();
    const { t } = useTranslation();

    if (value)
        return (
            <Chip
                size="small"
                label={t('manage-test-view.test-list.active')}
                classes={{ root: classes.successLabel }}
            />
        );

    return <Chip size="small" label={t('manage-test-view.test-list.done')} classes={{ root: classes.doneLabel }} />;
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
