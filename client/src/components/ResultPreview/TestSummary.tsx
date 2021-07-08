import { useTranslation } from 'react-i18next';
import { Card, createStyles, Grid, IconButton, Theme, Typography, Box, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { getResultColorAndLabel } from './calculateResult';
import { MAX_OVERALL_POINTS } from './constants';
import { ButtonSecondary } from '../Button';
import { openAgeDescriptionModal } from './modals/AgeDescriptionModal';
import { openSnackbar } from '../Snackbar/openSnackbar';
import { openAdviceModal } from './modals/AdviceModal';
import { CircleChart } from '../CircleChart';
import dayjs from '../../localizedMoment';
import { AssessmentResult, Child } from '../../graphql/types';
import { countSumOfPoints } from '../../utils/countSumOfPoints';

export interface Props {
    result: AssessmentResult;
    child: Child;
    prefix: string;
}

export const TestSummary = ({ result, child, prefix }: Props) => {
    const { t } = useTranslation();

    const { sumOfPointsFirstMeasurement, sumOfPointsLastMeasurement } = countSumOfPoints(result);
    const points = prefix === 'first' ? sumOfPointsFirstMeasurement : sumOfPointsLastMeasurement;
    const { color, key } = getResultColorAndLabel(points, MAX_OVERALL_POINTS);
    const classes = useStyles({ color });
    const { age } = result.child;
    const title = prefix === 'first' ? t('child-profile.initial-test') : t('child-profile.final-test');
    const description =
        prefix === 'first' ? t('child-profile.initial-fitness-level') : t('child-profile.final-fitness-level');

    return (
        <Card elevation={0}>
            <Box p={2}>
                <Box pb={2}>
                    <Typography variant="caption" color="textSecondary">
                        {t('child-profile.info-about-test')}
                    </Typography>
                    <Box my={1}>
                        <Typography variant="h4">{title}</Typography>
                    </Box>
                    <Typography variant="caption" color="textSecondary">
                        {t('child-profile.carries-out-on', { date: dayjs(result.createdAt).format('LL') })}
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
                        {description}:
                    </Typography>
                    <div className={classes.chart}>
                        <CircleChart
                            color={color}
                            value={points}
                            maxValue={MAX_OVERALL_POINTS}
                            label={String(points)}
                            labelSuffix={t('child-profile.pts')}
                            enableInfoIcon
                        />
                    </div>
                    <Typography variant="subtitle2" className={classes.resultDescription}>
                        {t(`child-profile.result-description.${key}`)}
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
            preventClose: false,
            isCancelButtonVisible: true,
            resultKey: key,
            child,
        }).then((res) => {
            if (!res.close)
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
            color: ({ color }: { color: string }) => color,
        },
        fitnessLevelLabel: {
            textAlign: 'center',
        },
    }),
);
