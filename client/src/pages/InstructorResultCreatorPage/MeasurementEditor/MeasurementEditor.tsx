import { Box, createStyles, Grid, makeStyles, SimplePaletteColorOptions, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { AssessmentParam } from '@app/graphql/types';
import { theme } from '@app/theme/theme';
import { OutlinedTextField } from '@app/components/OutlinedTextField';
import dayjs from '@app/localizedMoment';
import { MeasurementPoint, Origin } from './MeasurementPoint';
import { countPoints, countInvertedPoints } from '../countPoints';
import { ResultCreatorReturnProps, AssessmentValues } from '../useResultCreator';

export interface MeasurementValues {
    run: number;
    pendelumRun: number;
    throw: number;
    jump: number;
}

interface MeasurementEditorProps {
    resultCreator: ResultCreatorReturnProps;
    measurement: string;
    value: AssessmentValues;
    note: string;
    onChange: (value: MeasurementValues) => void;
    onNoteChange: (value: string) => void;
    onEditClick: (name: string) => void;
}

export function MeasurementEditor({
    resultCreator,
    value,
    onChange,
    onEditClick,
    note,
    onNoteChange,
    measurement,
}: MeasurementEditorProps) {
    const classes = useStyles();
    const { t } = useTranslation();

    const LENGTH_LIMIT = 500;

    const { selectedChild: child } = resultCreator;

    const { run, pendelumRun, jump, throw: _throw } = child.currentParams!;

    const result = resultCreator.kindergartenResults.find((r) => r.childId === resultCreator.selectedChild._id);

    if (!child.currentParams || !run || !pendelumRun || !jump || !_throw) {
        return <Typography variant="body1">{"The child doesn't suit to the test"}</Typography>;
    }

    return (
        <Grid container justifyContent="space-between" direction="column" spacing={1} className={classes.container}>
            <Grid item>
                <MeasurementPoint
                    changeDate={getPendelumRunMeasurementDate()}
                    color={getInvertedColor(value.pendelumRun, pendelumRun)}
                    disabled={resultCreator.edited === 'pendelumRun'}
                    isEmpty={resultCreator.values.pendelumRun === 0 && resultCreator.edited !== 'pendelumRun'}
                    label={t('add-result-page.dexterity')}
                    maxValue={pendelumRun.lowerLimitPoints}
                    onChange={(inputValue, origin) => handleChange(inputValue, 'pendelumRun', origin)}
                    onClick={() => onEditClick('pendelumRun')}
                    param={pendelumRun}
                    points={countPoints(value.pendelumRun, pendelumRun)}
                    step={0.1}
                    unit="s"
                    value={value.pendelumRun}
                />
            </Grid>

            <Grid item>
                <MeasurementPoint
                    changeDate={getJumpMeasurementDate()}
                    color={getColor(value.jump, jump)}
                    disabled={resultCreator.edited === 'jump'}
                    isEmpty={resultCreator.values.jump === 0 && resultCreator.edited !== 'jump'}
                    label={t('add-result-page.power')}
                    maxValue={jump.upperLimitPoints}
                    onChange={(inputValue, origin) => handleChange(inputValue, 'jump', origin)}
                    onClick={() => onEditClick('jump')}
                    param={jump}
                    points={countInvertedPoints(value.jump, jump)}
                    step={1}
                    unit="cm"
                    value={value.jump}
                />
            </Grid>

            <Grid item>
                <MeasurementPoint
                    changeDate={getThrowMeasurementDate()}
                    color={getColor(value.throw, _throw)}
                    disabled={resultCreator.edited === 'throw'}
                    isEmpty={resultCreator.values.throw === 0 && resultCreator.edited !== 'throw'}
                    label={t('add-result-page.strength')}
                    maxValue={_throw.upperLimitPoints}
                    onChange={(inputValue, origin) => handleChange(inputValue, 'throw', origin)}
                    onClick={() => onEditClick('throw')}
                    param={_throw}
                    points={countInvertedPoints(value.throw, _throw)}
                    step={10}
                    unit="cm"
                    value={value.throw}
                />
            </Grid>

            <Grid item>
                <MeasurementPoint
                    changeDate={getRunMeasurementDate()}
                    color={getInvertedColor(value.run, run)}
                    disabled={resultCreator.edited === 'run'}
                    isEmpty={resultCreator.values.run === 0 && resultCreator.edited !== 'run'}
                    label={t('add-result-page.velocity')}
                    maxValue={run.lowerLimitPoints}
                    onChange={(inputValue, origin) => handleChange(inputValue, 'run', origin)}
                    onClick={() => onEditClick('run')}
                    param={run}
                    points={countPoints(value.run, run)}
                    step={0.1}
                    unit="s"
                    value={value.run}
                />
            </Grid>

            <Grid item>
                <Box mb={2}>
                    <Typography variant="subtitle2">{t('add-result-page.note')}</Typography>
                </Box>

                <OutlinedTextField
                    onChange={(inputValue) => inputValue.length <= LENGTH_LIMIT && onNoteChange(inputValue)}
                    options={{ multiline: true, minRows: 7 }}
                    value={note || ''}
                />

                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Box mt={1}>
                            <Typography variant="caption" color="textSecondary">
                                {t('add-results-page.add-note-modal.text-limit', {
                                    noteLength: note?.length || 0,
                                    noteLimit: LENGTH_LIMIT,
                                })}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

    function handleChange(inputValue: string, name: string, origin: Origin) {
        onChange({ ...value, [name]: inputValue });

        if (origin === Origin.CHECKBOX && Number(inputValue) === 0) {
            resultCreator.add(name);
        }
    }

    function getPendelumRunMeasurementDate() {
        let date: Date | undefined;

        if (measurement === 'first') {
            date = result?.firstMeasurementPendelumRunDate;
        } else {
            date = result?.lastMeasurementPendelumRunDate;
        }

        if (!date) return;

        return dayjs(date).fromNow();
    }

    function getRunMeasurementDate() {
        let date: Date | undefined;

        if (measurement === 'first') {
            date = result?.firstMeasurementRunDate;
        } else {
            date = result?.lastMeasurementRunDate;
        }

        if (!date) return;

        return dayjs(date).fromNow();
    }

    function getThrowMeasurementDate() {
        let date: Date | undefined;

        if (measurement === 'first') {
            date = result?.firstMeasurementThrowDate;
        } else {
            date = result?.lastMeasurementThrowDate;
        }

        if (!date) return;

        return dayjs(date).fromNow();
    }

    function getJumpMeasurementDate() {
        let date: Date | undefined;

        if (measurement === 'first') {
            date = result?.firstMeasurementJumpDate;
        } else {
            date = result?.lastMeasurementJumpDate;
        }

        if (!date) return;

        return dayjs(date).fromNow();
    }

    function getColor(limit: number, param: AssessmentParam) {
        if (limit <= param.weakStageLimit) return (theme.palette?.error as SimplePaletteColorOptions).main || 'red';

        if (limit <= param.middleStageLimit)
            return (theme.palette?.warning as SimplePaletteColorOptions).main || 'yellow';

        if (limit <= param.goodStageLimit)
            return (theme.palette?.success as SimplePaletteColorOptions).light || 'green';

        return (theme.palette?.success as SimplePaletteColorOptions).main || 'green';
    }

    function getInvertedColor(limit: number, param: AssessmentParam) {
        if (limit >= param.weakStageLimit) return (theme.palette?.error as SimplePaletteColorOptions).main || 'red';

        if (limit >= param.middleStageLimit)
            return (theme.palette?.warning as SimplePaletteColorOptions).main || 'yellow';

        if (limit >= param.goodStageLimit)
            return (theme.palette?.warning as SimplePaletteColorOptions).light || 'green';

        return (theme.palette?.success as SimplePaletteColorOptions).main || 'green';
    }
}

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            padding: '10px 24px 8px 24px',
        },
    }),
);
