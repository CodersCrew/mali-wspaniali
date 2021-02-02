import React from 'react';
import { Box, createStyles, Grid, makeStyles, SimplePaletteColorOptions, Theme, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Child } from '../../../graphql/types';
import { theme as customTheme } from '../../../theme/theme';
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
                            color={getColorFromCumulatedPoints()}
                            maxValue={maxPoints}
                            value={points}
                            label={`${Math.ceil(points)} ${t('add-result-page.points')}`}
                        />
                    </div>
                </Box>
            </Grid>
        </Grid>
    );

    function getColorFromCumulatedPoints() {
        if (points <= 159) return (customTheme.palette?.error as SimplePaletteColorOptions).main || 'red';

        if (points <= 199) return (customTheme.palette?.warning as SimplePaletteColorOptions).main || 'yellow';

        if (points <= 239) return (customTheme.palette?.success as SimplePaletteColorOptions).light || 'green';

        return (customTheme.palette?.success as SimplePaletteColorOptions).main || 'green';
    }
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
