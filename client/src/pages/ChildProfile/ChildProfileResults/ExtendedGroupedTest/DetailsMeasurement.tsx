import { makeStyles, Box, createStyles, Typography, Link, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { CircleChart } from '../../../../components/CircleChart';
import { PointsChip } from '@app/components/PointsChip';
import { AssessmentParam, AssessmentResult } from '@app/graphql/types';
import {
    countMeasurementResultInPoints,
    interprateResult,
    localizeName,
    maxMeasurementPoints,
    MeasurementName,
    measurementResult,
    measurementResultColor,
    unitOf,
} from '@app/components/ResultPreview/calculateResult';

export function DetailsMeasurement(props: {
    name: MeasurementName;
    assessmentPeriod: string;
    param: AssessmentParam;
    result: AssessmentResult;
    onReadMoreClick: () => void;
}) {
    const { t } = useTranslation();
    const calculatePoints = countMeasurementResultInPoints(props.name);
    const value = measurementResult(props.name, props.assessmentPeriod, props.result);
    const color = measurementResultColor(value, props.param, props.name);
    const resultInterpretation = interprateResult(value, props.param, props.name);
    const unit = unitOf(props.name);

    const classes = useStyles({ color });

    return (
        <div>
            <Box width="110px" height="110px">
                <CircleChart
                    color={color}
                    value={calculatePoints(value, props.param)}
                    maxValue={maxMeasurementPoints(props.param)}
                    label={String(value)}
                    labelSuffix={unit}
                />
            </Box>
            <Box mt={2} mb={1}>
                <Typography variant="h4">{t(`child-profile.tests-in-block.${localizeName(props.name)}`)}</Typography>
            </Box>
            <Typography variant="body2" className={classes.description}>
                {t(`child-profile.test-description.${localizeName(props.name)}`)}
            </Typography>
            <Box mb={1}>
                <Typography variant="subtitle1">{t('child-profile.result-level')}</Typography>
            </Box>
            <Typography variant="subtitle2" className={classes.level}>
                {t(`child-profile.result-levels.${resultInterpretation}`)}
            </Typography>
            <Typography variant="subtitle1">{t('child-profile.received-points')}:</Typography>
            <PointsChip
                min={calculatePoints(value, props.param)}
                max={maxMeasurementPoints(props.param)}
                color={color}
            />
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
