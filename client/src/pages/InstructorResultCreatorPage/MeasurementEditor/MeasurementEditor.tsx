import React from 'react';
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { MeasurementPoint } from './MeasurementPoint';
import { Child } from '../../../graphql/types';

interface MeasurementValues {
    run: number;
    pendelumRun: number;
    throw: number;
    jump: number;
}

interface Props {
    values: MeasurementValues;
    points: MeasurementValues;
    onChange: (value: MeasurementValues) => void;
    child: Child;
}

export function MeasurementEditor({ child, points, values, onChange }: Props) {
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
                    unit="s"
                    name={t('add-result-page.dexterity')}
                    onChange={(value) => onChange({ ...values, pendelumRun: value })}
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
                    unit="cm"
                    name={t('add-result-page.power')}
                    onChange={(value) => onChange({ ...values, jump: value })}
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
                    unit="cm"
                    name={t('add-result-page.strength')}
                    onChange={(value) => onChange({ ...values, throw: value })}
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
                    unit="s"
                    name={t('add-result-page.velocity')}
                    onChange={(value) => onChange({ ...values, run: value })}
                />
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: '10px 24px',
        },
    }),
);
