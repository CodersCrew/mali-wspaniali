import { createStyles, Theme, Typography, Box, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { CircleChart } from '../../../../components/CircleChart';
import { getResultColorAndLabel } from '../../../../components/ResultPreview/calculateResult';
import { MAX_POINTS_FOR_TEST } from '../../../../components/ResultPreview/constants';
import { white } from '../../../../colors';
import { ButtonSecondary } from '../../../../components/Button';
import { openDetailsModal } from '../../../../components/ResultPreview/modals/DetailsModal';
import { openSnackbar } from '../../../../components/Snackbar/openSnackbar';
import { AssessmentParam, Child } from '../../../../graphql/types';

interface Props {
    valueInUnitOfMeasure: number;
    valueInPoints: number;
    unitOfMeasure: string;
    translationKey: string;
    param?: AssessmentParam;
    child: Child;
}

export function Measurement(props: Props) {
    const { t } = useTranslation();
    const { color, key } = getResultColorAndLabel(props.valueInPoints, MAX_POINTS_FOR_TEST);

    const classes = useStyles({ color });

    return (
        <div className={classes.container}>
            <Box width="110px" height="110px">
                <CircleChart
                    color={color}
                    value={props.valueInPoints}
                    maxValue={MAX_POINTS_FOR_TEST}
                    label={String(props.valueInUnitOfMeasure)}
                    labelSuffix={props.unitOfMeasure}
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
            <Typography variant="subtitle2" className={classes.level}>
                {t(`child-profile.result-levels.${key}`)}
            </Typography>
            <Typography variant="subtitle1" className={classes.pointsHeader}>
                {t('child-profile.received-points')}:
            </Typography>
            <div className={classes.points}>
                {Math.round(props.valueInPoints)} {t('child-profile.pts')}
            </div>
            <ButtonSecondary
                variant="text"
                className={classes.detailsButton}
                innerText={t('child-profile.details')}
                disabled={!props.valueInPoints}
                onClick={onDetailsButtonClick}
            />
        </div>
    );

    function onDetailsButtonClick() {
        openDetailsModal({
            isCancelButtonVisible: true,
            measurementProps: props,
            child: props.child,
        }).then((res) => {
            if (!res.close)
                openSnackbar({
                    text: t('parent-settings.modal-edit-account.success-message'),
                });
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
            backgroundColor: ({ color }: { color: string }) => color,
        },
        description: {
            paddingBottom: theme.spacing(2),
        },
        level: {
            paddingBottom: theme.spacing(2),
            textTransform: 'uppercase',
            color: ({ color }: { color: string }) => color,
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
