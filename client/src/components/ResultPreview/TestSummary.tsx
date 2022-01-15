import { useTranslation } from 'react-i18next';
import { Card, createStyles, Grid, IconButton, Theme, Typography, Box, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import { ButtonSecondary } from '../Button';
import { openAgeDescriptionModal } from './modals/AgeDescriptionModal';
import { openSnackbar } from '../Snackbar/openSnackbar';
import { openAdviceModal } from './modals/AdviceModal';
import { CircleChart } from '../CircleChart';
import dayjs from '../../localizedMoment';
import { ResultContext } from './context';
import { Result } from './Result';

export interface Props {
    prefix: string;
}

export const TestSummary = ({ prefix }: Props) => {
    const { t } = useTranslation();
    const result = React.useContext(ResultContext);
    const classes = useStyles();

    if (!result) return null;

    const resultWrapper = new Result({ result, prefix });
    const age = resultWrapper.getChildAge();
    const chartDetails = resultWrapper.getUniversalParam();

    return (
        <Card elevation={0}>
            <Box p={2}>
                <Box pb={2}>
                    <Typography variant="caption" color="textSecondary">
                        {t('child-profile.info-about-test')}
                    </Typography>
                    <Box my={1}>
                        <Typography variant="h4">{getTitle()}</Typography>
                    </Box>
                    <Typography variant="caption" color="textSecondary">
                        {t('child-profile.carries-out-on', {
                            date: dayjs(resultWrapper.result.createdAt).format('ll').toString(),
                        })}
                    </Typography>
                </Box>
                <Divider />
                <Grid direction="row" justify="flex-start" alignItems="center" container>
                    <Grid item>
                        <Typography variant="body1">
                            {t('child-profile.age-group')}:&nbsp;
                            <strong>
                                {age} {t('years', { count: age })}
                            </strong>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton aria-label="notifications" onClick={onDescriptionButtonClick}>
                            <InfoOutlinedIcon />
                        </IconButton>
                    </Grid>
                </Grid>
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
                        {t(`child-profile.result-description.${chartDetails.key}`)}
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

    function onDescriptionButtonClick() {
        openAgeDescriptionModal().then((dialogResult) => {
            if (dialogResult.close) return;

            openSnackbar({
                text: t('user-settings.modal-edit-account.success-message'),
            });
        });
    }

    function onAdviceButtonClick() {
        openAdviceModal({
            resultKey: chartDetails.key!,
            result: resultWrapper,
        }).then((dialogResult) => {
            if (dialogResult.close) return;

            openSnackbar({
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
