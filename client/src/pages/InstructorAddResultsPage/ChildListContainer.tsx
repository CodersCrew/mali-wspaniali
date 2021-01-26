import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, Box } from '@material-ui/core';
import { ArrowUpward, ArrowDownward, Assessment as AssessmentIcon, BarChart, EventNote } from '@material-ui/icons';
import { Assessment, Child, AssessmentResult } from '../../graphql/types';
import { parseDateToAge } from '../../utils/parseDateToAge';
import { Clickable } from '../../components/Clickable';

interface Props {
    childList: Child[];
    results: AssessmentResult[];
    assessment: Assessment;
    fullNameSortType: string;
    ageSortType: string;
    onClick: (type: string, value: string) => void;
}

export function ChildListContainer(props: Props) {
    const { t } = useTranslation();
    const isFirstMeasurementDisabled = props.assessment.firstMeasurementStatus !== 'active';
    const isLastMeasurementDisabled = props.assessment.lastMeasurementStatus !== 'active';
    const isResultDisabled = isFirstMeasurementDisabled && isLastMeasurementDisabled;

    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell onClick={() => props.onClick('full-name', '')}>
                        <SortableHeaderItem label={t('add-results-page.full-name')} type={props.fullNameSortType} />
                    </TableCell>
                    <TableCell onClick={() => props.onClick('age', '')} align="right">
                        <SortableHeaderItem label={t('add-results-page.age')} type={props.ageSortType} />
                    </TableCell>
                    <TableCell align="center">{t('add-results-page.first-assessment')}</TableCell>
                    <TableCell align="center">{t('add-results-page.last-assessment')}</TableCell>
                    <TableCell align="center">{t('add-results-page.see-results')}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.childList.map((c) => {
                    const lastNote = getLastNote(c._id);

                    return (
                        <TableRow key={c._id} hover>
                            <TableCell>
                                {c.firstname} {c.lastname}
                            </TableCell>
                            <TableCell align="right">{parseDateToAge(c.birthYear, c.birthQuarter)}</TableCell>
                            <TableCell align="center">
                                <IconButton
                                    onClick={() => props.onClick('add-first-assessment-result', c._id)}
                                    disabled={isFirstMeasurementDisabled}
                                >
                                    <BarChart titleAccess={t('add-results-page.add-first-assessment-result')} />
                                </IconButton>
                                <IconButton
                                    onClick={() => props.onClick('add-first-assessment-note', c._id)}
                                    disabled={isFirstMeasurementDisabled}
                                >
                                    <EventNote titleAccess={t('add-results-page.add-note')} />
                                </IconButton>
                            </TableCell>
                            <TableCell align="center">
                                <IconButton
                                    onClick={() => props.onClick('add-last-assessment-result', c._id)}
                                    disabled={isLastMeasurementDisabled}
                                >
                                    <BarChart titleAccess={t('add-results-page.add-last-assessment-result')} />
                                </IconButton>
                                <IconButton
                                    color={lastNote ? 'primary' : 'default'}
                                    onClick={() => props.onClick('add-last-assessment-note', c._id)}
                                    disabled={isLastMeasurementDisabled}
                                >
                                    <EventNote titleAccess={t('add-results-page.add-note')} />
                                </IconButton>
                            </TableCell>
                            <TableCell align="center">
                                <IconButton
                                    onClick={() => props.onClick('see-results', c._id)}
                                    disabled={isResultDisabled}
                                >
                                    <AssessmentIcon titleAccess={t('add-results-page.see-results')} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );

    function getLastNote(childId: string) {
        return props.results.find((r) => r.childId === childId)?.lastMeasurementNote;
    }
}

function SortableHeaderItem({ type, label }: { type: string; label: string }) {
    return (
        <Clickable>
            <Box display="flex" justifyItems="center">
                <Box mr={1}>{label}</Box>
                <ArrowItem type={type} />
            </Box>
        </Clickable>
    );
}

function ArrowItem({ type }: { type: string }) {
    if (type === '') return <>-</>;

    if (type === 'asc') return <ArrowUpward />;

    return <ArrowDownward />;
}
