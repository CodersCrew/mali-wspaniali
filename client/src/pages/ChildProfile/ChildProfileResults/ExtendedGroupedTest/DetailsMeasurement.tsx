import { makeStyles, Box, createStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { CircleChart } from '../../../../components/CircleChart';
import { getResultColorAndLabel } from '../../../../components/ResultPreview/calculateResult';
import { white } from '../../../../colors';
import { MeasurementProps } from './types';
import { AssessmentParam } from '../../../../graphql/types';

interface Props {
    measurmentProps: MeasurementProps;
    param: AssessmentParam;
    name: string;
}

export function DetailsMeasurement({ measurmentProps, param, name }: Props) {
    const { valueInUnitOfMeasure, valueInPoints, unitOfMeasure, translationKey } = measurmentProps;
    const { t } = useTranslation();
    const { color, key, maxValueInPoints } = getResultColorAndLabel(valueInPoints, param, name);

    const classes = useStyles({ color });

    return (
        <div>
            <Box width="110px" height="110px">
                <CircleChart
                    color={color}
                    value={valueInPoints}
                    maxValue={maxValueInPoints}
                    label={String(valueInUnitOfMeasure)}
                    labelSuffix={unitOfMeasure}
                />
            </Box>
            <Box mt={2} mb={1}>
                <Typography variant="h4">{t(`child-profile.tests-in-block.${translationKey}`)}</Typography>
            </Box>
            <Typography variant="body2" className={classes.description}>
                {t(`child-profile.test-description.${translationKey}`)}
            </Typography>
            <Box mb={1}>
                <Typography variant="subtitle1">{t('child-profile.result-level')}</Typography>
            </Box>
            <Typography variant="subtitle2" className={classes.level}>
                {t(`child-profile.result-levels.${key}`)}
            </Typography>
            <Typography variant="subtitle1">{t('child-profile.received-points')}:</Typography>
            <div className={classes.points}>
                {Math.round(valueInPoints)} {t('child-profile.pts')}
            </div>
        </div>
    );
}

const useStyles = makeStyles(() =>
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
    }),
);
