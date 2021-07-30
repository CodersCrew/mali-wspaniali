import {
    Box,
    createStyles,
    Grid,
    makeStyles,
    SimplePaletteColorOptions,
    TextField,
    Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { MeasurementPoint } from './MeasurementPoint';
import dayjs from '../../../localizedMoment';
import { countPoints, countInvertedPoints } from '../countPoints';
import { ResultCreatorReturnProps, AssessmentValues } from '../useResultCreator';
import { AssessmentParam } from '../../../graphql/types';
import { theme } from '../../../theme/theme';

interface MeasurementValues {
    run: number;
    pendelumRun: number;
    throw: number;
    jump: number;
}

interface Props {
    resultCreator: ResultCreatorReturnProps;
    measurement: string;
    value: AssessmentValues;
    note: string;
    onChange: (value: MeasurementValues) => void;
    onNoteChange: (value: string) => void;
    onEditClick: (name: string) => void;
}

export function MeasurementEditor(props: Props) {
    const classes = useStyles();
    const { t } = useTranslation();
    const LENGTH_LIMIT = 500;

    const { selectedChild: child } = props.resultCreator;

    const { run, pendelumRun, jump, throw: throwBall } = child.currentParams!;

    const result = props.resultCreator.kindergartenResults.find(
        (r) => r.childId === props.resultCreator.selectedChild._id,
    );

    if (!child.currentParams || !run || !pendelumRun || !jump || !throwBall) {
        return <Typography variant="body1">The child doesnt suit to the test</Typography>;
    }

    return (
        <Grid container justify="space-between" direction="column" spacing={1} className={classes.container}>
            <Grid item>
                <MeasurementPoint
                    isEmpty={
                        props.resultCreator.values.pendelumRun === 0 && props.resultCreator.edited !== 'pendelumRun'
                    }
                    step={0.1}
                    maxValue={pendelumRun.lowerLimitPoints}
                    param={pendelumRun}
                    points={countPoints(props.value.pendelumRun, pendelumRun)}
                    color={getInvertedColor(props.value.pendelumRun, pendelumRun)}
                    value={props.value.pendelumRun}
                    changeDate={getPendelumRunMeasurementDate()}
                    unit="s"
                    label={t('add-result-page.dexterity')}
                    disabled={props.resultCreator.edited === 'pendelumRun'}
                    onChange={(value) => props.onChange({ ...props.value, pendelumRun: value })}
                    onClick={() => props.onEditClick('pendelumRun')}
                />
            </Grid>
            <Grid item>
                <MeasurementPoint
                    isEmpty={props.resultCreator.values.jump === 0 && props.resultCreator.edited !== 'jump'}
                    step={1}
                    maxValue={jump.upperLimitPoints}
                    param={jump}
                    points={countInvertedPoints(props.value.jump, jump)}
                    color={getColor(props.value.jump, jump)}
                    value={props.value.jump}
                    changeDate={getJumpMeasurementDate()}
                    unit="cm"
                    label={t('add-result-page.power')}
                    disabled={props.resultCreator.edited === 'jump'}
                    onChange={(value) => props.onChange({ ...props.value, jump: value })}
                    onClick={() => props.onEditClick('jump')}
                />
            </Grid>
            <Grid item>
                <MeasurementPoint
                    isEmpty={props.resultCreator.values.throw === 0 && props.resultCreator.edited !== 'throwBall'}
                    step={10}
                    maxValue={throwBall.upperLimitPoints}
                    param={throwBall}
                    points={countInvertedPoints(props.value.throw, throwBall)}
                    color={getColor(props.value.throw, throwBall)}
                    value={props.value.throw}
                    changeDate={getThrowMeasurementDate()}
                    unit="cm"
                    label={t('add-result-page.strength')}
                    disabled={props.resultCreator.edited === 'throw'}
                    onChange={(value) => props.onChange({ ...props.value, throw: value })}
                    onClick={() => props.onEditClick('throw')}
                />
            </Grid>
            <Grid item>
                <MeasurementPoint
                    isEmpty={props.resultCreator.values.run === 0 && props.resultCreator.edited !== 'run'}
                    step={0.1}
                    maxValue={run.lowerLimitPoints}
                    param={run}
                    points={countPoints(props.value.run, run)}
                    color={getInvertedColor(props.value.run, run)}
                    value={props.value.run}
                    changeDate={getRunMeasurementDate()}
                    unit="s"
                    label={t('add-result-page.velocity')}
                    disabled={props.resultCreator.edited === 'run'}
                    onChange={(value) => props.onChange({ ...props.value, run: value })}
                    onClick={() => props.onEditClick('run')}
                />
            </Grid>
            <Grid item>
                <Box mb={2}>
                    <Typography variant="subtitle2">{t('add-result-page.note')}</Typography>
                </Box>
                <TextField
                    fullWidth
                    multiline
                    variant="outlined"
                    rows={7}
                    value={props.note || ''}
                    onChange={({ target: { value } }) => value.length <= LENGTH_LIMIT && props.onNoteChange(value)}
                />
                <Grid container justify="flex-end">
                    <Grid item>
                        <Box mt={1}>
                            <Typography variant="caption" color="textSecondary">
                                {t('add-results-page.add-note-modal.text-limit', {
                                    noteLength: props.note?.length || 0,
                                    noteLimit: LENGTH_LIMIT,
                                })}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

    function getPendelumRunMeasurementDate() {
        let date: Date | undefined;

        if (props.measurement === 'first') {
            date = result?.firstMeasurementPendelumRunDate;
        } else {
            date = result?.lastMeasurementPendelumRunDate;
        }

        if (!date) return;

        return dayjs(date).fromNow();
    }

    function getRunMeasurementDate() {
        let date: Date | undefined;

        if (props.measurement === 'first') {
            date = result?.firstMeasurementRunDate;
        } else {
            date = result?.lastMeasurementRunDate;
        }

        if (!date) return;

        return dayjs(date).fromNow();
    }

    function getThrowMeasurementDate() {
        let date: Date | undefined;

        if (props.measurement === 'first') {
            date = result?.firstMeasurementThrowDate;
        } else {
            date = result?.lastMeasurementThrowDate;
        }

        if (!date) return;

        return dayjs(date).fromNow();
    }

    function getJumpMeasurementDate() {
        let date: Date | undefined;

        if (props.measurement === 'first') {
            date = result?.firstMeasurementJumpDate;
        } else {
            date = result?.lastMeasurementJumpDate;
        }

        if (!date) return;

        return dayjs(date).fromNow();
    }

    function getColor(value: number, param: AssessmentParam) {
        if (value <= param.weakStageLimit) return (theme.palette?.error as SimplePaletteColorOptions).main || 'red';

        if (value <= param.middleStageLimit)
            return (theme.palette?.warning as SimplePaletteColorOptions).main || 'yellow';

        if (value <= param.goodStageLimit)
            return (theme.palette?.success as SimplePaletteColorOptions).light || 'green';

        return (theme.palette?.success as SimplePaletteColorOptions).main || 'green';
    }

    function getInvertedColor(value: number, param: AssessmentParam) {
        if (value >= param.weakStageLimit) return (theme.palette?.error as SimplePaletteColorOptions).main || 'red';

        if (value >= param.middleStageLimit)
            return (theme.palette?.warning as SimplePaletteColorOptions).main || 'yellow';

        if (value >= param.goodStageLimit)
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
