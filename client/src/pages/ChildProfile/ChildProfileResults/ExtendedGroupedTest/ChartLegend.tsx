import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import { createStyles, Grid, Typography, Box } from '@material-ui/core';
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
        <>
            <Typography variant="overline">{t('child-profile.comparison-legend.title')}</Typography>
            <Typography variant="subtitle2">{t(`child-profile.comparison-legend.${resultKey}`)}</Typography>
            <Box mb={3}>
                {resultKey !== 'constant' && (
                    <Typography variant="h4" className={classes.legendPoints}>
                        <Box display="flex">
                            <Box mr={1}>{resultKey === 'progress' ? <TrendingUpIcon /> : <TrendingDownIcon />}</Box>
                            {difference}
                            {t('child-profile.pts')}
                        </Box>
                    </Typography>
                )}
            </Box>
            <Grid item>
                <LegendItem label={t('child-profile.comparison-legend.initial-result')} color="#9E9E9E" />
                <LegendItem label={t('child-profile.comparison-legend.final-result')} color="#212121" />
            </Grid>
        </>
    );
};

const useStyles = makeStyles(() =>
    createStyles({
        legendPoints: {
            color: ({ color }: { color: string }) => color,
        },
    }),
);

function LegendItem({ label, color }: { label: string; color: string }) {
    return (
        <Grid container direction="row" justify="flex-start" alignItems="center">
            <Grid item lg={2}>
                <svg width="20" height="20" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="160" height="80" rx="40" x="10" y="80" fill={color} />
                </svg>
            </Grid>
            <Grid item lg={10}>
                <Typography variant="body2">{label}</Typography>
            </Grid>
        </Grid>
    );
}
