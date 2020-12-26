import React from 'react';
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { PieChart } from 'react-minimal-pie-chart';
import { Child } from '../../../graphql/types';

interface Props {
    selectedChild: Child;
}

export function ChildHeader({ selectedChild }: Props) {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item>
                <Grid container direction="column" justify="space-between" className={classes.childPersonalInformation}>
                    <Grid item>
                        <Typography variant="h4">
                            {selectedChild.firstname} {selectedChild.lastname}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">POZIOM SPRAWNOŚCI PRÓBY POCZĄTKOWEJ</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <div className={classes.pieContainer}>
                    <PieChart
                        lineWidth={6}
                        totalValue={270}
                        data={[
                            {
                                color: 'grey',
                                value: 0,
                            },
                        ]}
                        labelPosition={0}
                        labelStyle={{ fontSize: '20px' }}
                        background="rgba(0, 0, 0, 0.04)"
                        startAngle={270}
                    />
                </div>
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        pieContainer: {
            width: theme.spacing(8),
            height: theme.spacing(8),
        },
        resultHeading: {
            padding: '10px 24px',
        },
        childPersonalInformation: {
            height: '100%',
            padding: '6px 0',
        },
    }),
);
