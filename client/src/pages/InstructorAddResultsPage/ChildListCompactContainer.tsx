import { useState } from 'react';
import {
    Box,
    Grid,
    List,
    ListItem,
    Typography,
    TableBody,
    TableRow,
    Table,
    TableCell,
    makeStyles,
} from '@material-ui/core';
import { Assessment as AssessmentIcon, BarChart, EventNote, ExpandLess, ExpandMore } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { Assessment, Child, AssessmentResult } from '../../graphql/types';
import { parseDateToAge } from '../../utils/parseDateToAge';
import { Clickable } from '../../components/Clickable';
import { countProgress } from '../InstructorResultCreatorPage/countProgress';
import { CountIcon } from '../../components/CountIcon';
import { CustomIconButton } from '../../components/Button/CustomIconButton';

interface Props {
    childList: Child[];
    assessment: Assessment;
    results: AssessmentResult[];
    onClick: (type: string, value: string) => void;
}

export function ChildListCompactContainer({ results, childList, assessment, onClick }: Props) {
    const { t } = useTranslation();
    const classes = useStyles();
    const [selectedChild, setSelectedChild] = useState(childList[0]?._id);
    const isFirstMeasurementDisabled = assessment.firstMeasurementStatus !== 'active';
    const isLastMeasurementDisabled = assessment.lastMeasurementStatus !== 'active';
    const isResultDisabled = isFirstMeasurementDisabled && isLastMeasurementDisabled;

    return (
        <List disablePadding>
            {childList.map((c) => {
                const firstNote = getFirstNote(c._id);
                const lastNote = getLastNote(c._id);
                const isOpen = selectedChild === c._id;
                const age = parseDateToAge(c.birthYear, c.birthQuarter);
                const firstMeasurementResultCount = countMeasurementResults('first', c._id);
                const lastMeasurementResultCount = countMeasurementResults('last', c._id);

                return (
                    <>
                        <ListItem divider key={c._id}>
                            <Grid container direction="column">
                                <Grid item onClick={() => setSelectedChild((prev) => (prev !== c._id ? c._id : ''))}>
                                    <Clickable>
                                        <Grid container alignItems="center">
                                            <Grid item>
                                                <Box mr={2} display="flex">
                                                    {isOpen ? <ExpandLess /> : <ExpandMore />}
                                                </Box>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2">
                                                    {c.firstname} {c.lastname}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Clickable>
                                </Grid>
                                {isOpen && (
                                    <Grid container alignItems="center">
                                        <Grid item>
                                            <Box ml={3} pt={1}>
                                                <Table>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell classes={{ root: classes.cell }}>
                                                                <Typography variant="subtitle2">
                                                                    {t('add-results-page.age')}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell colSpan={2} classes={{ root: classes.cell }}>
                                                                <Typography variant="body2">
                                                                    {age} {t('add-results-page.years', { count: age })}
                                                                </Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell classes={{ root: classes.cell }}>
                                                                <Typography variant="subtitle2">
                                                                    <u>{t('add-results-page.first-assessment')}</u>
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell classes={{ root: classes.cell }}>
                                                                <Box display="flex" alignItems="center">
                                                                    <CustomIconButton
                                                                        color={matchResultWithColor(
                                                                            firstMeasurementResultCount,
                                                                        )}
                                                                        onClick={() =>
                                                                            onClick(
                                                                                'add-first-assessment-result',
                                                                                c._id,
                                                                            )
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
                                                                    <CountIcon
                                                                        value={firstMeasurementResultCount}
                                                                        max={4}
                                                                    />
                                                                </Box>
                                                            </TableCell>
                                                            <TableCell classes={{ root: classes.cell }}>
                                                                <CustomIconButton
                                                                    color={firstNote ? 'success' : 'default'}
                                                                    onClick={() =>
                                                                        onClick('add-first-assessment-note', c._id)
                                                                    }
                                                                    disabled={isFirstMeasurementDisabled}
                                                                    icon={
                                                                        <EventNote
                                                                            titleAccess={t('add-results-page.add-note')}
                                                                        />
                                                                    }
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell classes={{ root: classes.cell }}>
                                                                <Typography variant="subtitle2">
                                                                    <u>{t('add-results-page.last-assessment')}</u>
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell classes={{ root: classes.cell }}>
                                                                <Box display="flex" alignItems="center">
                                                                    <CustomIconButton
                                                                        color={matchResultWithColor(
                                                                            lastMeasurementResultCount,
                                                                        )}
                                                                        onClick={() =>
                                                                            onClick('add-last-assessment-result', c._id)
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
                                                                    <CountIcon
                                                                        value={lastMeasurementResultCount}
                                                                        max={4}
                                                                    />
                                                                </Box>
                                                            </TableCell>
                                                            <TableCell classes={{ root: classes.cell }}>
                                                                <CustomIconButton
                                                                    color={lastNote ? 'success' : 'default'}
                                                                    onClick={() =>
                                                                        onClick('add-last-assessment-note', c._id)
                                                                    }
                                                                    disabled={isLastMeasurementDisabled}
                                                                    icon={
                                                                        <EventNote
                                                                            titleAccess={t('add-results-page.add-note')}
                                                                        />
                                                                    }
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell classes={{ root: classes.cell }}>
                                                                <Typography variant="subtitle2">
                                                                    {t('add-results-page.see-results')}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell classes={{ root: classes.cell }}>
                                                                <CustomIconButton
                                                                    disabled={isResultDisabled}
                                                                    onClick={() => onClick('see-results', c._id)}
                                                                    icon={
                                                                        <AssessmentIcon
                                                                            titleAccess={t(
                                                                                'add-results-page.see-results',
                                                                            )}
                                                                        />
                                                                    }
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                )}
                            </Grid>
                        </ListItem>
                    </>
                );
            })}
        </List>
    );

    function countMeasurementResults(measurement: string, childId: string) {
        const childResult = results.find((r) => r.childId === childId);

        return childResult ? countProgress(measurement, childResult) : 0;
    }

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
}

const useStyles = makeStyles({
    cell: {
        border: 'none',
    },
});
