import { createStyles, Grid, Hidden, makeStyles, Theme, Typography, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { BasicModal } from '../../../../../components/Modal/BasicModal';
import { ChildInput } from '../../../../../graphql/types';
import { ActionDialog, openDialog } from '../../../../../utils/openDialog';
import { DetailsMeasurement } from '../DetailsMeasurement';
import { Results } from '../Results';
import { MeasurementProps } from '../types';
import { useIsDevice } from '../../../../../queries/useBreakpoints';

const T_DETAILS_PREFIX = 'child-profile.details-modal';

type DetailsModalProps = {
    isCancelButtonVisible: boolean;
    measurementProps: MeasurementProps;
};

const DetailsModal = ({ onClose, measurementProps }: DetailsModalProps & ActionDialog<{ child: ChildInput }>) => {
    const { t } = useTranslation();
    const device = useIsDevice();

    const percentile = 36;

    const { minScale, maxScale, scale39, scale49, scale59, a, b } = measurementProps.param!;

    const rangeMax = Math.min(countValue(maxScale), measurementProps.param?.lowerLimitPoints!);

    const resultsData = {
        v1: minScale,
        v2: scale39,
        v3: scale49,
        v4: scale59,
        v5: maxScale,
        unit: measurementProps.unitOfMeasure,
        result: measurementProps.valueInUnitOfMeasure,
        resultStart: 160,
        hasScoreRangeLabels: true,
        sex: 'male',
        rangeMin: measurementProps.param?.upperLimitPoints!,
        range39: countValue(scale39),
        range59: countValue(scale59),
        rangeMax,
    };
    const classes = useStyles();

    return (
        <BasicModal
            actionName={t('close')}
            isOpen
            onClose={onClose}
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
                        <DetailsMeasurement measurmentProps={measurementProps} />
                        <NextMeasurement />
                    </Box>
                </Box>
                <Box display="flex" flex="1" flexDirection="column" py={2}>
                    <Typography className={classes.typographySpacing} variant="h4">
                        {t(`${T_DETAILS_PREFIX}.assesment-details`)}
                    </Typography>
                    <Typography className={classes.typographySpacing} variant="body2">
                        {t(`${T_DETAILS_PREFIX}.content.${measurementProps.translationKey}`)}
                    </Typography>
                    <Typography className={(classes.typographySpacing, classes.titleSpacing)} variant="h4">
                        {t(`${T_DETAILS_PREFIX}.result-details.title`)}
                    </Typography>
                    <Box pl={4} pr={4}>
                        <Results resultsData={resultsData} />
                    </Box>
                    <Grid container>
                        <Grid item>
                            <Typography className={classes.typographySpacing} variant="subtitle2">
                                {t(`${T_DETAILS_PREFIX}.result-details.child-result`)}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                className={classes.typographySpacing}
                                variant="body2"
                            >{`${resultsData.result}  ${resultsData.unit}`}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item>
                            <Typography className={classes.typographySpacing} variant="subtitle2">
                                {t(`${T_DETAILS_PREFIX}.result-details.points`)}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={classes.typographySpacing} variant="body2">
                                {`${countValue(resultsData.result)}/${countValue(measurementProps.param?.maxScale!)}`}
                                {t(`${T_DETAILS_PREFIX}.result-details.text-1`)}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Typography className={classes.typographySpacing} variant="subtitle2">
                        {t(`${T_DETAILS_PREFIX}.result-details.text-2`)}
                    </Typography>
                    <Typography className={classes.typographySpacing} variant="body2">
                        {percentile} {t(`${T_DETAILS_PREFIX}.result-details.text-3`)}
                    </Typography>
                    <Typography className={classes.typographySpacing} variant="subtitle2">
                        {t(`${T_DETAILS_PREFIX}.result-details.next-level.title`)}
                    </Typography>
                    <Typography variant="body2">
                        {/* TBD: I want to check new backend response before adding logic to next level text */}
                        Niski
                        {t(`${T_DETAILS_PREFIX}.result-details.next-level.text-1`)}
                        {resultsData.result}
                        {resultsData.unit}
                        {t(`${T_DETAILS_PREFIX}.result-details.next-level.text-2`)}
                        {resultsData.v5 - resultsData.result}
                        {resultsData.unit}
                        {t(`${T_DETAILS_PREFIX}.result-details.next-level.text-3`)}
                    </Typography>
                </Box>
            </Box>
        </BasicModal>
    );

    function countValue(value: number) {
        console.log(value);

        return Math.round(a * value + b);
    }
};

export const openDetailsModal = (props: DetailsModalProps) => {
    return openDialog<DetailsModalProps>(DetailsModal, props);
};

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
