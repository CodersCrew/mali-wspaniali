import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, createStyles, Theme, Typography, Box, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ButtonSecondary } from '../Button';
import { openSnackbar } from '../Snackbar/openSnackbar';
import { openAdviceModal } from './modals/AdviceModal';
import { CircleChart } from '../CircleChart';
import { ResultContext } from './context';
import { Result } from './Result';

export interface Props {
    prefix: string;
}

export const TestSummary = ({ prefix }: Props) => {
    const { t } = useTranslation();

    const result = useContext(ResultContext);

    const classes = useStyles();

    if (!result) return null;

    const resultWrapper = new Result({ result, prefix });
    const age = resultWrapper.getChildAge();
    const chartDetails = resultWrapper.getUniversalParam();

    return (
        <Card elevation={0}>
            <Box p={2} pt={0}>
                <Box pb={2}>
                    <Typography variant="caption" color="textSecondary">
                        {t('child-profile.info-about-test')}
                    </Typography>

                    <Box my={1}>
                        <Typography variant="h4">{getTitle()}</Typography>
                    </Box>

                    {/*
                    <Typography variant="caption" color="textSecondary">
                        {t('child-profile.carries-out-on', {
                            date: dayjs(resultWrapper.result.createdAt).format('ll').toString(),
                        })}
                    </Typography>
*/}
                </Box>

                <Divider />

                <Box my={2}>
                    <Typography variant="body1">
                        {t('child-profile.age-group')}:&nbsp;
                        <strong>
                            {age} {t('years', { count: age })}
                        </strong>
                    </Typography>
                </Box>

                <Divider />

                <Box display="flex" flexDirection="column" alignItems="center" px={4} py={2}>
                    <Typography variant="body1" className={classes.fitnessLevelLabel}>
                        {getDescription()}:
                    </Typography>

                    <div className={classes.chart}>
                        <CircleChart
                            color={chartDetails.color!}
                            value={chartDetails.valueInPoints!}
                            maxValue={chartDetails.maxValueInPoints!}
                            label={String(Math.round(chartDetails.valueInPoints!))}
                            labelSuffix={t('child-profile.pts')}
                            enableInfoIcon
                        />
                    </div>

                    <Typography
                        variant="subtitle2"
                        className={classes.resultDescription}
                        style={{ color: chartDetails.color }}
                    >
                        {t(`child-profile.result-description.${chartDetails.key || ''}`)}
                    </Typography>

                    <ButtonSecondary
                        variant="contained"
                        onClick={onAdviceButtonClick}
                        innerText={t('child-profile.advice')}
                    />
                </Box>
            </Box>
        </Card>
    );

    function getTitle() {
        return prefix === 'first' ? t('child-profile.initial-test') : t('child-profile.final-test');
    }

    function getDescription() {
        return prefix === 'first' ? t('child-profile.initial-fitness-level') : t('child-profile.final-fitness-level');
    }

    function onAdviceButtonClick() {
        // eslint-disable-next-line no-void
        void openAdviceModal({
            resultKey: chartDetails.key!,
            result: resultWrapper,
        }).then((res) => {
            if (!res.close)
                // eslint-disable-next-line no-void
                void openSnackbar({
                    text: t('user-settings.modal-edit-account.success-message'),
                });
        });
    }
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chart: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(0.5),
            width: theme.spacing(13.5),
        },
        resultDescription: {
            textAlign: 'center',
            fontFamily: 'Montserrat',
            textTransform: 'uppercase',
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(1),
        },
        fitnessLevelLabel: {
            textAlign: 'center',
        },
    }),
);
