import React, { useState } from 'react';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import { MeasurementPoint } from './MeasurementPoint';

export function MeasurementEditor() {
    const [dextPoint, setDextPoint] = useState(0);
    const classes = useStyles();

    return (
        <Grid container justify="space-between" direction="column" spacing={1} className={classes.container}>
            <Grid item>
                <MeasurementPoint
                    isEmpty
                    maxValue={50}
                    value={dextPoint}
                    unit="cm"
                    name="ZRĘCZNOŚĆ"
                    onChange={setDextPoint}
                />
            </Grid>
            <Grid item>
                <MeasurementPoint
                    isEmpty
                    maxValue={50}
                    value={dextPoint}
                    unit="cm"
                    name="ZRĘCZNOŚĆ"
                    onChange={setDextPoint}
                />
            </Grid>
            <Grid item>
                <MeasurementPoint
                    isEmpty
                    maxValue={50}
                    value={dextPoint}
                    unit="cm"
                    name="ZRĘCZNOŚĆ"
                    onChange={setDextPoint}
                />
            </Grid>
            <Grid item>
                <MeasurementPoint
                    isEmpty
                    maxValue={50}
                    value={dextPoint}
                    unit="cm"
                    name="ZRĘCZNOŚĆ"
                    onChange={setDextPoint}
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
