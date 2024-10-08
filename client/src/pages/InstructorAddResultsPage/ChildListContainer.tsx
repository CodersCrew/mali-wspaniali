import { useTranslation } from 'react-i18next';
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, Box, Grid } from '@material-ui/core';
import { ArrowUpward, ArrowDownward, Assessment as AssessmentIcon, BarChart, EventNote } from '@material-ui/icons';
import { Assessment, Child, AssessmentResult } from '@app/graphql/types';
import { parseDateToAge } from '@app/utils/parseDateToAge';
import { Clickable } from '@app/components/Clickable';
import { CustomIconButton } from '@app/components/Button/CustomIconButton';
import { CountIcon } from '@app/components/CountIcon';
import { countProgress } from '../InstructorResultCreatorPage/countProgress';
import dayjs from '../../localizedMoment';

interface Props {
    ageSortType: string;
    assessment: Assessment;
    childList: Child[];
    creationDateSortType: string;
    fullNameSortType: string;
    onClick: (type: string, value: string) => void;
    results: AssessmentResult[];
    selectedGroup: string;
}

export function ChildListContainer({
    childList,
    results,
    assessment,
    fullNameSortType,
    ageSortType,
    creationDateSortType,
    onClick,
    selectedGroup,
}: Props) {
    const { t } = useTranslation();
    const isFirstMeasurementDisabled = assessment.firstMeasurementStatus !== 'active';
    const isLastMeasurementDisabled = assessment.lastMeasurementStatus !== 'active';

    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell onClick={() => onClick('full-name', '')}>
                        <SortableHeaderItem label={t('add-results-page.full-name')} type={fullNameSortType} />
                    </TableCell>

                    <TableCell onClick={() => onClick('age', '')}>
                        <SortableHeaderItem label={t('add-results-page.age')} type={ageSortType} isCenter />
                    </TableCell>

                    <TableCell onClick={() => onClick('created-at', '')}>
                        <SortableHeaderItem
                            label={t('add-results-page.created-at')}
                            type={creationDateSortType}
                            isCenter
                        />
                    </TableCell>

                    <TableCell align="center">{t('add-results-page.first-assessment')}</TableCell>

                    <TableCell align="center">{t('add-results-page.last-assessment')}</TableCell>

                    <TableCell align="center">{t('add-results-page.see-results')}</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {childList.map((c) => {
                    const firstNote = getFirstNote(c._id);
                    const lastNote = getLastNote(c._id);
                    const firstMeasurementResultCount = countMeasurementResults('first', c._id);
                    const lastMeasurementResultCount = countMeasurementResults('last', c._id);
                    const isResultDisabled = isFirstMeasurementDisabled && isLastMeasurementDisabled;
                    const result = results.find((r) => r.childId === c._id);

                    let isGroupActive;

                    if (selectedGroup === '') {
                        isGroupActive = true;
                    } else if (selectedGroup === 'unassigned') {
                        isGroupActive =
                            result?.firstMeasurementGroup === '' || result?.firstMeasurementGroup === undefined;
                    } else {
                        isGroupActive = result?.firstMeasurementGroup === selectedGroup;
                    }

                    if (!isGroupActive) return null;

                    return (
                        <TableRow key={c._id} hover>
                            <TableCell>{`${c.lastname}, ${c.firstname}`}</TableCell>

                            <TableCell align="center">{parseDateToAge(c.birthYear, c.birthQuarter)}</TableCell>

                            <TableCell align="center">{dayjs(c.createdAt).format('L')}</TableCell>

                            <TableCell align="center">
                                <Grid container alignItems="center" justifyContent="space-evenly">
                                    <Grid item xs={3}>
                                        <Box display="flex" alignItems="center">
                                            <Grid container alignItems="center">
                                                <Grid item sm={12} md={8}>
                                                    <CustomIconButton
                                                        color={matchResultWithColor(firstMeasurementResultCount)}
                                                        onClick={() => onClick('add-first-assessment-result', c._id)}
                                                        disabled={isFirstMeasurementDisabled}
                                                        icon={
                                                            <BarChart
                                                                titleAccess={t(
                                                                    'add-results-page.add-first-assessment-result',
                                                                )}
                                                            />
                                                        }
                                                    />
                                                </Grid>

                                                <Grid item sm={12} md={4}>
                                                    <CountIcon value={firstMeasurementResultCount} max={4} />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <Box display="flex" alignItems="center" justifyContent="center">
                                            <CustomIconButton
                                                color={firstNote ? 'success' : 'default'}
                                                onClick={() => onClick('add-first-assessment-note', c._id)}
                                                disabled={isFirstMeasurementDisabled}
                                                icon={<EventNote titleAccess={t('add-results-page.add-note')} />}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </TableCell>

                            <TableCell align="center">
                                <Grid container justifyContent="space-evenly">
                                    <Grid item sm={6} md={4}>
                                        <Box display="flex" alignItems="center">
                                            <Grid container alignItems="center">
                                                <Grid item sm={12} md={8}>
                                                    <CustomIconButton
                                                        color={matchResultWithColor(lastMeasurementResultCount)}
                                                        onClick={() => onClick('add-last-assessment-result', c._id)}
                                                        disabled={isLastMeasurementDisabled}
                                                        icon={
                                                            <BarChart
                                                                titleAccess={t(
                                                                    'add-results-page.add-last-assessment-result',
                                                                )}
                                                            />
                                                        }
                                                    />
                                                </Grid>

                                                <Grid item sm={12} md={4}>
                                                    <CountIcon value={lastMeasurementResultCount} max={4} />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid>

                                    <Grid item sm={6} md={4}>
                                        <CustomIconButton
                                            color={lastNote ? 'success' : 'default'}
                                            onClick={() => onClick('add-last-assessment-note', c._id)}
                                            disabled={isLastMeasurementDisabled}
                                            icon={<EventNote titleAccess={t('add-results-page.add-note')} />}
                                        />
                                    </Grid>
                                </Grid>
                            </TableCell>

                            <TableCell align="center">
                                {result && (
                                    <IconButton
                                        onClick={() => onClick('see-results', result._id)}
                                        disabled={!isResultDisabled}
                                    >
                                        <AssessmentIcon titleAccess={t('add-results-page.see-results')} />
                                    </IconButton>
                                )}
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
        return results.find((r) => r.childId === childId)?.firstMeasurementNote;
    }

    function getLastNote(childId: string) {
        return results.find((r) => r.childId === childId)?.lastMeasurementNote;
    }

    function countMeasurementResults(measurement: string, childId: string) {
        const childResult = results.find((r) => r.childId === childId);

        return childResult ? countProgress(measurement, childResult) : 0;
    }
}

function SortableHeaderItem({ type, label, isCenter }: { type: string; label: string; isCenter?: boolean }) {
    return (
        <Clickable>
            <Box display="flex" justifyContent={isCenter ? 'center' : 'left'} alignItems="center">
                <Box mr={1}>{label}</Box>
                <ArrowItem type={type} />
            </Box>
        </Clickable>
    );
}

function ArrowItem({ type }: { type: string }) {
    if (type === '') return <ArrowUpward color="disabled" />;

    if (type === 'asc') return <ArrowUpward />;

    return <ArrowDownward />;
}
