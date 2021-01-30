import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, Box, Grid } from '@material-ui/core';
import {
    ArrowUpward,
    ArrowDownward,
    Assessment as AssessmentIcon,
    BarChart,
    EventNote,
    Done,
} from '@material-ui/icons';
import { Assessment, Child, AssessmentResult } from '../../graphql/types';
import { parseDateToAge } from '../../utils/parseDateToAge';
import { Clickable } from '../../components/Clickable';
import { CustomIconButton } from '../../components/Button/CustomIconButton';
import { CustomTypography } from '../../components/CustomTypography';

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
                    <TableCell onClick={() => props.onClick('age', '')} align="center">
                        <SortableHeaderItem label={t('add-results-page.age')} type={props.ageSortType} />
                    </TableCell>
                    <TableCell align="center">{t('add-results-page.first-assessment')}</TableCell>
                    <TableCell align="center">{t('add-results-page.last-assessment')}</TableCell>
                    <TableCell align="center">{t('add-results-page.see-results')}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.childList.map((c) => {
                    const firstNote = getFirstNote(c._id);
                    const lastNote = getLastNote(c._id);
                    const firstMeasurementResultCount = countFirstMeasurementResults(c._id);
                    const lastMeasurementResultCount = countLastMeasurementResults(c._id);

                    return (
                        <TableRow key={c._id} hover>
                            <TableCell>
                                {c.firstname} {c.lastname}
                            </TableCell>
                            <TableCell align="center">{parseDateToAge(c.birthYear, c.birthQuarter)}</TableCell>
                            <TableCell align="center">
                                <Grid container alignItems="center">
                                    <Grid item xs={3}>
                                        <Box display="flex" alignItems="center">
                                            <IconButton
                                                onClick={() => props.onClick('add-first-assessment-result', c._id)}
                                                disabled={isFirstMeasurementDisabled}
                                            >
                                                <BarChart
                                                    titleAccess={t('add-results-page.add-first-assessment-result')}
                                                />
                                            </IconButton>
                                            <InfoIcon value={firstMeasurementResultCount} />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Box display="flex" alignItems="center" justifyContent="center">
                                            <CustomIconButton
                                                color={firstNote ? 'success' : 'default'}
                                                onClick={() => props.onClick('add-first-assessment-note', c._id)}
                                                disabled={isFirstMeasurementDisabled}
                                                icon={<EventNote titleAccess={t('add-results-page.add-note')} />}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </TableCell>
                            <TableCell align="center">
                                <Grid container>
                                    <Grid item xs={3}>
                                        <Box display="flex" alignItems="center">
                                            <CustomIconButton
                                                color={matchResultWithColor(lastMeasurementResultCount)}
                                                onClick={() => props.onClick('add-last-assessment-result', c._id)}
                                                disabled={isLastMeasurementDisabled}
                                                icon={
                                                    <BarChart
                                                        titleAccess={t('add-results-page.add-last-assessment-result')}
                                                    />
                                                }
                                            />
                                            <InfoIcon value={lastMeasurementResultCount} />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <CustomIconButton
                                            color={lastNote ? 'success' : 'default'}
                                            onClick={() => props.onClick('add-last-assessment-note', c._id)}
                                            disabled={isLastMeasurementDisabled}
                                            icon={<EventNote titleAccess={t('add-results-page.add-note')} />}
                                        />
                                    </Grid>
                                </Grid>
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

    function matchResultWithColor(result: number) {
        if (result === 4) return 'success-dark';

        if (result === 0) return 'default';

        return 'success';
    }

    function getFirstNote(childId: string) {
        return props.results.find((r) => r.childId === childId)?.firstMeasurementNote;
    }

    function getLastNote(childId: string) {
        return props.results.find((r) => r.childId === childId)?.lastMeasurementNote;
    }

    function countFirstMeasurementResults(childId: string) {
        let count = 0;

        const childResult = props.results.find((r) => r.childId === childId);

        if (!childResult) return 0;

        if (childResult.firstMeasurementJumpResult) {
            count += 1;
        }

        if (childResult.firstMeasurementPendelumRunResult) {
            count += 1;
        }

        if (childResult.firstMeasurementRunResult) {
            count += 1;
        }

        if (childResult.firstMeasurementThrowResult) {
            count += 1;
        }

        return count;
    }

    function countLastMeasurementResults(childId: string) {
        let count = 0;

        const childResult = props.results.find((r) => r.childId === childId);

        if (!childResult) return 0;

        if (childResult.lastMeasurementJumpResult) {
            count += 1;
        }

        if (childResult.lastMeasurementPendelumRunResult) {
            count += 1;
        }

        if (childResult.lastMeasurementRunResult) {
            count += 1;
        }

        if (childResult.lastMeasurementThrowResult) {
            count += 1;
        }

        return count;
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

function InfoIcon({ value }: { value: number }) {
    if (value === 0) return null;

    if (value === 4)
        return (
            <span>
                <Done fontSize="small" />
            </span>
        );

    return <CustomTypography variant="body2" color="success" text={`${value}/4`} />;
}
