import React from 'react';
import { Box, createStyles, Grid, makeStyles, SimplePaletteColorOptions, Theme, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { Child } from '../../../graphql/types';
import { theme as theme1 } from '../../../theme/theme';
import { CircleChart } from '../../../components/CircleChart';

interface Props {
    description: string;
    selectedChild: Child;
    points: number;
    maxPoints: number;
}

export function ChildHeader({ description, selectedChild, points, maxPoints }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Grid container className={classes.container}>
            <Grid item xs={8}>
                <Grid container direction="column" justify="space-between" className={classes.childPersonalInformation}>
                    <Grid item>
                        <Typography variant="h4">
                            {selectedChild.firstname} {selectedChild.lastname}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">{description}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <Box display="flex" justifyContent="flex-end">
                    <div className={classes.pieContainer}>
                        <CircleChart
                            color={(theme1.palette!.success as SimplePaletteColorOptions).main}
                            maxValue={maxPoints}
                            value={points}
                            label={`${Math.ceil(points)} ${t('add-result-page.points')}`}
                        />
                    </div>
                </Box>
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
        },
        container: {
            padding: theme.spacing(1, 2),
        },
    }),
);
