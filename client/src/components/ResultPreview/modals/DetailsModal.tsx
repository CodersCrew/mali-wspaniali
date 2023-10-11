import { createStyles, Grid, Hidden, makeStyles, Theme, Typography, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { BasicModal } from '@app/components/Modal/BasicModal';
import { DetailsMeasurement } from '@app/pages/ChildProfile/ChildProfileResults/ExtendedGroupedTest/DetailsMeasurement';
import { Results } from '@app/pages/ChildProfile/ChildProfileResults/ExtendedGroupedTest/Results';
import { useIsDevice } from '@app/queries/useBreakpoints';
import { ActionDialog, openDialog } from '@app/utils/openDialog';

import { Result } from '../Result';

const T_DETAILS_PREFIX = 'child-profile.details-modal';

function DetailsModal(props: { resultWrapper: Result } & ActionDialog<{ readMoreClicked: boolean }>) {
    const { t } = useTranslation();
    const device = useIsDevice();
    const { minScale, maxScale, scale39, scale49, scale59, a, b, lowerLimitPoints, upperLimitPoints } =
        props.resultWrapper.getParam()!;

    const rangeMax = Math.min(countValue(maxScale), lowerLimitPoints);

    const resultsData = {
        result: props.resultWrapper.getValue(),
        resultStart: 160,
        hasScoreRangeLabels: true,
        sex: props.resultWrapper.getSex(),
        rangeMin: upperLimitPoints,
        range39: countValue(scale39),
        range59: countValue(scale59),
        rangeMax,
        firstName: props.resultWrapper.getChildName(),
        minScale,
        maxScale,
        scale39,
        scale49,
        scale59,
    };
    const classes = useStyles();

    const chartDetails = props.resultWrapper.getChartDetails();
    const nextLimit = chartDetails.nextKey
        ? (resultsData[chartDetails.key as keyof typeof resultsData] as number)
        : null;

    return (
        <BasicModal
            actionName={t('close')}
            isOpen
            onClose={props.onClose}
            isCancelButtonVisible
            dialogProps={{ maxWidth: 'md' }}
            closeButtonText={t('close')}
        >
            <Box
                display="flex"
                flexDirection={device.isSmallMobile ? 'column' : 'row'}
                alignItems={device.isSmallMobile && 'center'}
            >
                <Box minWidth="176" px={2} pb={2} width={device.isSmallMobile ? '50%' : 'unset'} display="flex">
                    <Box display="flex" flexDirection="column" justifyContent="space-between">
                        <DetailsMeasurement
                            result={props.resultWrapper}
                            onReadMoreClick={() => props.makeDecision({ accepted: true, readMoreClicked: true })}
                        />

                        {props.resultWrapper.isLastMeasurementFinished() && <NextMeasurement />}
                    </Box>
                </Box>

                <Box display="flex" flex="1" flexDirection="column" py={2}>
                    <Typography className={classes.typographySpacing} variant="h4">
                        {t(`${T_DETAILS_PREFIX}.assesment-details`)}
                    </Typography>

                    <Typography className={classes.typographySpacing} variant="body2">
                        {t(`${T_DETAILS_PREFIX}.content.${props.resultWrapper.translationKey}`)}
                    </Typography>

                    <Typography className={(classes.typographySpacing, classes.titleSpacing)} variant="h4">
                        {t(`${T_DETAILS_PREFIX}.result-details.title`)}
                    </Typography>

                    <Box pl={4} pr={4}>
                        <Results resultsData={resultsData} unit={props.resultWrapper.unit || ''} />
                    </Box>

                    <Grid container>
                        <Grid item>
                            <Typography className={classes.typographySpacing} variant="subtitle2" component="span">
                                {t(`${T_DETAILS_PREFIX}.result-details.child-result`)}
                            </Typography>
                            &nbsp;
                            <Typography
                                className={classes.typographySpacing}
                                variant="body2"
                                component="span"
                            >{`${resultsData.result}  ${props.resultWrapper.unit}`}</Typography>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item>
                            <Typography className={classes.typographySpacing} variant="subtitle2">
                                {t(`${T_DETAILS_PREFIX}.result-details.better-results-title`)}&nbsp;
                            </Typography>
                        </Grid>
                    </Grid>

                    {nextLimit && (
                        <NextFeatureLevel
                            unit={props.resultWrapper.unit || ''}
                            nextLimit={nextLimit}
                            nextKey={chartDetails.nextKey!}
                            valueToNextLimit={Math.round((props.resultWrapper.getValue() - nextLimit) * 100) / 100}
                        />
                    )}
                </Box>
            </Box>
        </BasicModal>
    );

    function countValue(value2: number) {
        return Math.round(a * value2 + b);
    }
}

export function openDetailsModal(resultWrapper: Result) {
    return openDialog<{ resultWrapper: Result }, { readMoreClicked: boolean }>(DetailsModal, { resultWrapper });
}

interface NextFeatureLevelProps {
    unit: string;
    nextLimit: number;
    valueToNextLimit: number;
    nextKey: string;
}

function NextFeatureLevel(props: NextFeatureLevelProps) {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <>
            <Typography className={classes.typographySpacing} variant="subtitle2">
                {t(`${T_DETAILS_PREFIX}.result-details.next-level.title`)}
            </Typography>
            <Typography variant="body2">
                {t(`${T_DETAILS_PREFIX}.result-details.next-level.text`, {
                    nextLevel: t(`child-profile.result-levels.${props.nextKey}`),
                    value: props.nextLimit,
                    unit: props.unit,
                    valueToNextLevel: Math.abs(props.valueToNextLimit),
                })}
            </Typography>
        </>
    );
}

function NextMeasurement() {
    const { t } = useTranslation();

    return (
        <Hidden only="xs">
            <Grid item>
                <Typography variant="subtitle2">{t(`${T_DETAILS_PREFIX}.next-assesment.title`)}</Typography>
                <Typography variant="body2">
                    {t(`${T_DETAILS_PREFIX}.next-assesment.text-1`)}6{t(`${T_DETAILS_PREFIX}.next-assesment.text-2`)}
                </Typography>
            </Grid>
        </Hidden>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        typographySpacing: {
            marginBottom: theme.spacing(1),
        },
        titleSpacing: {
            padding: theme.spacing(3, 0),
        },
        measurement: {
            [theme.breakpoints.down('md')]: {
                marginBottom: theme.spacing(3),
            },
        },
        content: {
            padding: theme.spacing(1),
        },
    }),
);
