import { makeStyles, Box, createStyles, Typography, Link, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { CircleChart } from '@app/components/CircleChart';
import { white } from '@app/colors';
import { Result } from '@app/components/ResultPreview/Result';
import dayjs from 'dayjs';

type DetailsMeasurementProps = {
    result: Result;
    onReadMoreClick: () => void;
};

export function DetailsMeasurement({ result, onReadMoreClick }: DetailsMeasurementProps) {
    const { t } = useTranslation();

    const chartDetails = result.getChartDetails();
    const classes = useStyles({ color: chartDetails.color });

    return (
        <div>
            <Box width="110px" height="110px">
                <CircleChart
                    color={chartDetails.color}
                    value={result.getChartValue()}
                    maxValue={result.getMaxValue() - result.getMinValue()}
                    label={String(result.getValue())}
                    labelSuffix={result.unit}
                />
            </Box>

            <Box mt={2} mb={1}>
                <Typography variant="h4">{t(`child-profile.tests-in-block.${result.translationKey}`)}</Typography>
            </Box>

            <Typography variant="body2" className={classes.description}>
                {t(`child-profile.test-description.${result.translationKey}`)}
            </Typography>

            <Box mb={1}>
                <Typography variant="subtitle1">{t('child-profile.result-level')}</Typography>
            </Box>

            <Typography variant="subtitle2" className={classes.level}>
                {t(`child-profile.result-levels.${chartDetails.key}`)}
            </Typography>

            <Typography variant="subtitle1">{t('child-profile.received-points')}:</Typography>

            <Box mb={3}>
                <div className={classes.points}>
                    {Math.round(chartDetails.valueInPoints)}/{chartDetails.maxValueInPoints} {t('child-profile.pts')}
                </div>
            </Box>

            <Box mb={1}>
                <Typography variant="subtitle1">{`${t('child-profile.carries-out-on')}:`}</Typography>
            </Box>

            {dayjs(result.getDate()).format('LL').toString()}

            <Box width="80%" mt={3}>
                <Link className={classes.link} onClick={onReadMoreClick}>
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
