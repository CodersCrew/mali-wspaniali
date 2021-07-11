import React from 'react';
import { createStyles, Theme, Typography, Box, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { CircleChart } from '../../../../components/CircleChart';
import { white } from '../../../../colors';
import { ButtonSecondary } from '../../../../components/Button';
import { openDetailsModal } from '../../../../components/ResultPreview/modals/DetailsModal';
import { ResultContext } from '../../../../components/ResultPreview/context';
import { Result } from '../../../../components/ResultPreview/Result';

interface Props {
    name: string;
    prefix: string;
    unitOfMeasure: string;
    translationKey: string;
}

export function Measurement(props: Props) {
    const result = React.useContext(ResultContext);
    const { t } = useTranslation();
    const classes = useStyles();

    if (!result) return null;

    const resultWrapper = new Result({
        result,
        unit: props.unitOfMeasure,
        name: props.name,
        prefix: props.prefix,
        translationKey: props.translationKey,
    });
    const chartDetails = resultWrapper.getChartDetails();

    return (
        <div className={classes.container}>
            <Box width="110px" height="110px">
                <CircleChart
                    color={chartDetails.color}
                    value={resultWrapper.getChartValue()}
                    maxValue={resultWrapper.getMaxValue() - resultWrapper.getMinValue()}
                    label={String(resultWrapper.getValue())}
                    labelSuffix={props.unitOfMeasure}
                    disable={!resultWrapper.getValue()}
                />
            </Box>
            <Typography variant="h4" className={classes.testName}>
                {t(`child-profile.tests-in-block.${props.translationKey}`)}
            </Typography>
            <Typography variant="body2" className={classes.description}>
                {t(`child-profile.test-description.${props.translationKey}`)}
            </Typography>
            <Typography variant="subtitle2" className={classes.levelLabel}>
                {t('child-profile.result-level')}
            </Typography>
            <Typography variant="subtitle2" className={classes.level} style={{ color: chartDetails.color }}>
                {t(`child-profile.result-levels.${chartDetails.key}`)}
            </Typography>
            <Typography variant="subtitle1" className={classes.pointsHeader}>
                {t('child-profile.received-points')}:
            </Typography>
            <div className={classes.points} style={{ backgroundColor: chartDetails.color }}>
                {Math.round(chartDetails.valueInPoints)} {t('child-profile.pts')}
            </div>
            <ButtonSecondary
                variant="text"
                className={classes.detailsButton}
                innerText={t('child-profile.details')}
                disabled={!chartDetails.valueInPoints}
                onClick={onDetailsButtonClick}
            />
        </div>
    );

    function onDetailsButtonClick() {
        openDetailsModal(resultWrapper);
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginTop: theme.spacing(1),
            height: ' 100%',
            display: 'flex',
            flexDirection: 'column',
            padding: 5,

            [theme.breakpoints.down('xs')]: {
                padding: theme.spacing(0, 3),
                marginTop: theme.spacing(1),
            },
            '& *': {
                flexGrow: 1,
            },
        },
        testName: {
            textTransform: 'uppercase',
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(1),
            lineHeight: 1.3,
            width: theme.spacing(15),
        },
        pointsHeader: {
            marginBottom: theme.spacing(0.5),
        },
        points: {
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'Montserrat',
            fontSize: 14,
            borderRadius: 16,
            textTransform: 'uppercase',
            fontWeight: 'bold',
            color: white,
            width: 'fit-content',
            padding: theme.spacing(0.5, 1),
        },
        description: {
            paddingBottom: theme.spacing(2),
        },
        level: {
            paddingBottom: theme.spacing(2),
            textTransform: 'uppercase',
        },
        levelLabel: {
            paddingBottom: theme.spacing(0.5),
        },
        detailsButton: {
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '100%',
            marginTop: theme.spacing(1),
            [theme.breakpoints.down('sm')]: {
                marginTop: theme.spacing(3),
            },
        },
    }),
);
