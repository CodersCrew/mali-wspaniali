import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import { createStyles, Grid, Theme, Typography } from '@material-ui/core';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';

interface Props {
    resultKey: string;
    color: string;
    difference: number;
}

export const ChartLegend = ({ resultKey, color, difference }: Props) => {
    const { t } = useTranslation();
    const classes = useStyles({ color });

    return (
        <div>
            <Typography variant="overline">{t('child-profile.comparison-legend.title')}</Typography>
            <Typography variant="subtitle2">{t(`child-profile.comparison-legend.${resultKey}`)}</Typography>
            {resultKey !== 'constant' && (
                <Typography variant="h4" className={classes.legendPoints}>
                    {resultKey === 'progress' ? <TrendingUpIcon /> : <TrendingDownIcon />}
                    {difference}
                    {t(`child-profile.pts`)}
                </Typography>
            )}
            <Grid item>
                <Grid container direction="row" justify="flex-start" alignItems="center">
                    <Grid item lg={2}>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 200 160"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect width="160" height="80" rx="40" x="10" y="80" fill="#9E9E9E" />
                        </svg>
                    </Grid>
                    <Grid item lg={10}>
                        <Typography variant="body2">{t(`child-profile.comparison-legend.initial-result`)}</Typography>
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="flex-start" alignItems="center">
                    <Grid item lg={2}>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 200 160"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect width="160" height="80" rx="40" x="10" y="80" fill="#212121" />
                        </svg>
                    </Grid>
                    <Grid item lg={10}>
                        <Typography variant="body2">{t(`child-profile.comparison-legend.final-result`)}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        legendPoints: {
            color: ({ color }: { color: string }) => color,
        },
    }),
);
