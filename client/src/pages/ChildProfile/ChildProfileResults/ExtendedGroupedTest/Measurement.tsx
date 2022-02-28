import { useContext } from 'react';
import { createStyles, Theme, Typography, Box, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { CircleChart } from '../../../../components/CircleChart';
import { white } from '../../../../colors';
import { ButtonSecondary } from '../../../../components/Button';
import { openDetailsModal } from '../../../../components/ResultPreview/modals/DetailsModal';
import { ResultContext } from '../../../../components/ResultPreview/context';
import { Result } from '../../../../components/ResultPreview/Result';

import {
    interprateResult,
    localizeName,
    MeasurementName,
    measurementResult,
    paramOf,
    unitOf,
} from '@app/components/ResultPreview/calculateResult';

interface MeasurementProps {
    name: MeasurementName;
    prefix: string;
    unitOfMeasure: string; // to delete
    translationKey: string;
}

export function Measurement(props: MeasurementProps) {
    const result = useContext(ResultContext);
    const { t } = useTranslation();
    const classes = useStyles();
    const history = useHistory();

    if (!result) return null;

    const childId = result.child._id;

    const resultWrapper = new Result({
        result,
        unit: props.unitOfMeasure, // to delete
        name: props.name,
        prefix: props.prefix,
        translationKey: props.translationKey,
    });
    const chartDetails = resultWrapper.getChartDetails();
    const param = paramOf(result, props.name);

    if (!param) return null;

    const unit = unitOf(props.name);
    const value = measurementResult(props.name, props.prefix, result);
    const resultInterpretation = interprateResult(value, param, props.name);

    return (
        <div className={classes.container}>
            <Box width="110px" height="110px">
                <CircleChart
                    color={chartDetails.color}
                    value={resultWrapper.getChartValue()}
                    maxValue={resultWrapper.getMaxValue() - resultWrapper.getMinValue()}
                    label={String(resultWrapper.getValue())}
                    labelSuffix={unit}
                    disable={!resultWrapper.getValue()}
                />
            </Box>
            <Typography variant="h4" className={classes.testName}>
                {t(`child-profile.tests-in-block.${localizeName(props.name)}`)}
            </Typography>
            <Typography variant="body2" className={classes.description}>
                {t(`child-profile.test-description.${localizeName(props.name)}`)}
            </Typography>
            <Typography variant="subtitle2" className={classes.levelLabel}>
                {t('child-profile.result-level')}
            </Typography>
            <Typography variant="subtitle2" className={classes.level} style={{ color: chartDetails.color }}>
                {t(`child-profile.result-levels.${resultInterpretation}`)}
            </Typography>
            <Typography variant="subtitle1" className={classes.pointsHeader}>
                {t('child-profile.received-points')}:
            </Typography>
            <div className={classes.points} style={{ backgroundColor: chartDetails.color }}>
                {Math.round(chartDetails.valueInPoints)}/{Math.round(chartDetails.maxValueInPoints)}
                {t('child-profile.pts')}
            </div>
            <ButtonSecondary
                variant="text"
                className={classes.detailsButton}
                innerText={t('child-profile.details')}
                onClick={onDetailsButtonClick}
            />
        </div>
    );

    function onDetailsButtonClick() {
        if (!result) return;

        openDetailsModal(props.name, props.prefix, resultWrapper, result).then(({ decision }) => {
            if (decision && decision.accepted && decision.readMoreClicked) {
                history.push(`/parent/child/${childId}/tests-information`);
            }
        });
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
            minHeight: 49,
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
