import React from 'react';
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { MeasurementPoint } from './MeasurementPoint';
import { Child, AssessmentResult } from '../../../graphql/types';
import dayjs from '../../../localizedMoment';

interface MeasurementValues {
    run: number;
    pendelumRun: number;
    throw: number;
    jump: number;
}

interface Props {
    values: MeasurementValues;
    points: MeasurementValues;
    child: Child;
    edited: string;
    measurement: string;
    result?: AssessmentResult;
    onChange: (value: MeasurementValues) => void;
    onEditClick: (name: string) => void;
}

export function MeasurementEditor({
    child,
    points,
    measurement,
    values,
    edited,
    result,
    onChange,
    onEditClick,
}: Props) {
    const classes = useStyles();
    const { t } = useTranslation();

    const { run, pendelumRun, jump, throw: throwBall } = child.currentParams!;

    if (!child.currentParams || !run || !pendelumRun || !jump || !throwBall) {
        return <Typography variant="body1">The child doesnt suit to the test</Typography>;
    }

    return (
        <Grid container justify="space-between" direction="column" spacing={1} className={classes.container}>
            <Grid item>
                <MeasurementPoint
                    isEmpty={values.pendelumRun === 0}
                    step={0.1}
                    maxValue={pendelumRun.lowerLimitPoints}
                    lowerLimit={pendelumRun.lowerLimit}
                    upperLimit={pendelumRun.upperLimit}
                    points={points.pendelumRun}
                    value={values.pendelumRun}
                    changeDate={getPendelumRunMeasurementDate()}
                    unit="s"
                    name={t('add-result-page.dexterity')}
                    disabled={edited === 'pendelumRun'}
                    onChange={(value) => onChange({ ...values, pendelumRun: value })}
                    onClick={() => onEditClick('pendelumRun')}
                />
            </Grid>
            <Grid item>
                <MeasurementPoint
                    isEmpty={values.jump === 0}
                    step={1}
                    maxValue={jump.upperLimitPoints}
                    lowerLimit={jump.lowerLimit}
                    upperLimit={jump.upperLimit}
                    points={points.jump}
                    value={values.jump}
                    changeDate={getRunMeasurementDate()}
                    unit="cm"
                    name={t('add-result-page.power')}
                    disabled={edited === 'jump'}
                    onChange={(value) => onChange({ ...values, jump: value })}
                    onClick={() => onEditClick('jump')}
                />
            </Grid>
            <Grid item>
                <MeasurementPoint
                    isEmpty={values.throw === 0}
                    step={10}
                    maxValue={throwBall.upperLimitPoints}
                    lowerLimit={throwBall.lowerLimit}
                    upperLimit={throwBall.upperLimit}
                    points={points.throw}
                    value={values.throw}
                    changeDate={getThrowMeasurementDate()}
                    unit="cm"
                    name={t('add-result-page.strength')}
                    disabled={edited === 'throwBall'}
                    onChange={(value) => onChange({ ...values, throw: value })}
                    onClick={() => onEditClick('throwBall')}
                />
            </Grid>
            <Grid item>
                <MeasurementPoint
                    isEmpty={values.run === 0}
                    step={0.1}
                    maxValue={run.lowerLimitPoints}
                    lowerLimit={run.lowerLimit}
                    upperLimit={run.upperLimit}
                    points={points.run}
                    value={values.run}
                    changeDate={getJumpMeasurementDate()}
                    unit="s"
                    name={t('add-result-page.velocity')}
                    disabled={edited === 'run'}
                    onChange={(value) => onChange({ ...values, run: value })}
                    onClick={() => onEditClick('run')}
                />
            </Grid>
        </Grid>
    );

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
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: '10px 24px',
        },
    }),
);
