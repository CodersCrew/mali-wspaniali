import { useTranslation } from 'react-i18next';
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, Box, Grid } from '@material-ui/core';
import { ArrowUpward, ArrowDownward, Assessment as AssessmentIcon, BarChart, EventNote } from '@material-ui/icons';
import { Assessment, Child, AssessmentResult } from '../../graphql/types';
import { parseDateToAge } from '../../utils/parseDateToAge';
import { Clickable } from '../../components/Clickable';
import { CustomIconButton } from '../../components/Button/CustomIconButton';
import { CountIcon } from '../../components/CountIcon';
import { countProgress } from '../InstructorResultCreatorPage/countProgress';

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
                    <TableCell onClick={() => props.onClick('age', '')}>
                        <SortableHeaderItem label={t('add-results-page.age')} type={props.ageSortType} center={true} />
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
                    const firstMeasurementResultCount = countMeasurementResults('first', c._id);
                    const lastMeasurementResultCount = countMeasurementResults('last', c._id);

                    return (
                        <TableRow key={c._id} hover>
                            <TableCell>
                                {c.firstname} {c.lastname}
                            </TableCell>
                            <TableCell align="center">{parseDateToAge(c.birthYear, c.birthQuarter)}</TableCell>
                            <TableCell align="center">
                                <Grid container alignItems="center" justify="space-evenly">
                                    <Grid item xs={3}>
                                        <Box display="flex" alignItems="center">
                                            <Grid container alignItems="center">
                                                <Grid item sm={12} md={8}>
                                                    <CustomIconButton
                                                        color={matchResultWithColor(firstMeasurementResultCount)}
                                                        onClick={() =>
                                                            props.onClick('add-first-assessment-result', c._id)
                                                        }
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
                                                onClick={() => props.onClick('add-first-assessment-note', c._id)}
                                                disabled={isFirstMeasurementDisabled}
                                                icon={<EventNote titleAccess={t('add-results-page.add-note')} />}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </TableCell>
                            <TableCell align="center">
                                <Grid container justify="space-evenly">
                                    <Grid item sm={6} md={4}>
                                        <Box display="flex" alignItems="center">
                                            <Grid container alignItems="center">
                                                <Grid item sm={12} md={8}>
                                                    <CustomIconButton
                                                        color={matchResultWithColor(lastMeasurementResultCount)}
                                                        onClick={() =>
                                                            props.onClick('add-last-assessment-result', c._id)
                                                        }
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

    function countMeasurementResults(measurement: string, childId: string) {
        const childResult = props.results.find((r) => r.childId === childId);

        return childResult ? countProgress(measurement, childResult) : 0;
    }
}

function SortableHeaderItem({ type, label, center }: { type: string; label: string; center?: boolean }) {
    return (
        <Clickable>
            <Box display="flex" justifyContent={center ? 'center' : 'left'}>
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
