import { makeStyles, Box, createStyles, Typography, Link, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { CircleChart } from '../../../../components/CircleChart';
import { white } from '../../../../colors';
import { Result } from '../../../../components/ResultPreview/Result';

export function DetailsMeasurement(props: { result: Result; onReadMoreClick: () => void }) {
    const { t } = useTranslation();

    const chartDetails = props.result.getChartDetails();
    const classes = useStyles({ color: chartDetails.color });

    return (
        <div>
            <Box width="110px" height="110px">
                <CircleChart
                    color={chartDetails.color}
                    value={props.result.getChartValue()}
                    maxValue={props.result.getMaxValue() - props.result.getMinValue()}
                    label={String(props.result.getValue())}
                    labelSuffix={props.result.unit}
                />
            </Box>
            <Box mt={2} mb={1}>
                <Typography variant="h4">{t(`child-profile.tests-in-block.${props.result.translationKey}`)}</Typography>
            </Box>
            <Typography variant="body2" className={classes.description}>
                {t(`child-profile.test-description.${props.result.translationKey}`)}
            </Typography>
            <Box mb={1}>
                <Typography variant="subtitle1">{t('child-profile.result-level')}</Typography>
            </Box>
            <Typography variant="subtitle2" className={classes.level}>
                {t(`child-profile.result-levels.${chartDetails.key}`)}
            </Typography>
            <Typography variant="subtitle1">{t('child-profile.received-points')}:</Typography>
            <div className={classes.points}>
                {Math.round(chartDetails.valueInPoints)}/{chartDetails.maxValueInPoints} {t('child-profile.pts')}
            </div>
            <Box width="80%" mt={2}>
                <Link className={classes.link} onClick={props.onReadMoreClick}>
                    {t('child-profile.count-points-read-more')}
                </Link>
            </Box>
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        points: {
            fontFamily: 'Montserrat',
            fontSize: '14px',
            borderRadius: '16px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            color: white,
            width: 'fit-content',
            padding: '3px 10px',
            marginTop: '15px',
            backgroundColor: ({ color }: { color: string }) => color,
        },
        description: {
            paddingBottom: '7px',
        },
        level: {
            paddingBottom: '7px',
            textTransform: 'uppercase',
            color: ({ color }: { color: string }) => color,
        },
        detailsButton: {
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '100%',
        },
        link: {
            color: theme.palette.text.secondary,
            cursor: 'pointer',
        },
    }),
);
