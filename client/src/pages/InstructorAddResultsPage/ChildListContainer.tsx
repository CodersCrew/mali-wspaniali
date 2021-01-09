import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { Assessment as AssessmentIcon, BarChart, EventNote } from '@material-ui/icons';
import { Assessment, Child } from '../../graphql/types';
import { parseBirthQuarter } from '../../utils/parseBirthQuarter';

interface Props {
    childList: Child[];
    assessment: Assessment;
    onClick: (type: string, value: string) => void;
}

export function ChildListContainer({ childList, assessment, onClick }: Props) {
    const { t } = useTranslation();
    const isFirstMeasurementDisabled = assessment.firstMeasurementStatus !== 'active';
    const isLastMeasurementDisabled = assessment.lastMeasurementStatus !== 'active';
    const isResultDisabled = isFirstMeasurementDisabled && isLastMeasurementDisabled;

    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>{t('add-results-page.firstname')}</TableCell>
                    <TableCell>{t('add-results-page.lastname')}</TableCell>
                    <TableCell align="right">{t('add-results-page.birth-year')}</TableCell>
                    <TableCell align="right">{t('add-results-page.birth-quarter')}</TableCell>
                    <TableCell align="center">{t('add-results-page.first-assessment')}</TableCell>
                    <TableCell align="center">{t('add-results-page.last-assessment')}</TableCell>
                    <TableCell align="center">{t('add-results-page.see-results')}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {childList.map((c) => (
                    <TableRow key={c._id} hover>
                        <TableCell>{c.firstname}</TableCell>
                        <TableCell>{c.lastname}</TableCell>
                        <TableCell align="right">{c.birthYear}</TableCell>
                        <TableCell align="right">{parseBirthQuarter(c.birthQuarter)}</TableCell>
                        <TableCell align="center">
                            <IconButton
                                onClick={() => onClick('add-first-assessment-result', c._id)}
                                disabled={isFirstMeasurementDisabled}
                            >
                                <BarChart titleAccess={t('add-results-page.add-first-assessment-result')} />
                            </IconButton>
                            <IconButton
                                onClick={() => onClick('add-first-assessment-note', c._id)}
                                disabled={isFirstMeasurementDisabled}
                            >
                                <EventNote titleAccess={t('add-results-page.add-note')} />
                            </IconButton>
                        </TableCell>
                        <TableCell align="center">
                            <IconButton
                                onClick={() => onClick('add-last-assessment-result', c._id)}
                                disabled={isLastMeasurementDisabled}
                            >
                                <BarChart titleAccess={t('add-results-page.add-last-assessment-result')} />
                            </IconButton>
                            <IconButton
                                onClick={() => onClick('add-last-assessment-note', c._id)}
                                disabled={isLastMeasurementDisabled}
                            >
                                <EventNote titleAccess={t('add-results-page.add-note')} />
                            </IconButton>
                        </TableCell>
                        <TableCell align="center">
                            <IconButton onClick={() => onClick('see-results', c._id)} disabled={isResultDisabled}>
                                <AssessmentIcon titleAccess={t('add-results-page.see-results')} />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
