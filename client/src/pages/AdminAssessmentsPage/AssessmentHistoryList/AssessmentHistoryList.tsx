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

import { AssessmentItem } from './AssessmentItem';
import { Assessment } from '../../../graphql/types';

interface Props {
    assessments: Assessment[];
}

export function TestHistoryList({ assessments }: Props) {
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
                    {assessments.map(assessment => (
                        <AssessmentItem
                            key={assessment._id}
                            value={assessment}
                            status={<Status value={!assessment.isOutdated} />}
                        />
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
