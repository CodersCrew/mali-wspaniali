import { Box, createStyles, makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import PasswordChangeSuccess from '../../assets/forgotPassword/password-change-success.svg';
import { ButtonSecondary } from '../../components/Button';
import { Theme } from '../../theme';

export const PasswordSuccessfullyChanged = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <div className={classes.successLayout}>
            <img src={PasswordChangeSuccess} alt="" className={classes.passwordChangeSuccessImage} />
            <Box mb={5} />
            <Typography variant="h3" className={classes.successTitle}>
                {t('password-change-success-page.password-change-success-title')}
            </Typography>
            <Box mb={2} />
            <Typography variant="subtitle1" className={classes.successSubtitle}>
                {t('password-change-success-page.password-change-success-subtitle')}
            </Typography>
            <Box mb={5} />
            <ButtonSecondary
                variant="contained"
                type="button"
                href="/login"
                innerText={t('password-change-success-page.login')}
            />
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        successLayout: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
                padding: theme.spacing(0, 6),
                marginTop: theme.spacing(8),
            },
        },
        passwordChangeSuccessImage: {
            height: 341,
        },
        successTitle: {
            textAlign: 'center',
            [theme.breakpoints.down('sm')]: {
                fontSize: '20px',
                fontWeight: 500,
                lineHeight: `${theme.spacing(3)}px`,
            },
        },
        successSubtitle: {
            textAlign: 'center',
            padding: theme.spacing(0, 10.5),
            [theme.breakpoints.down('sm')]: {
                padding: 0,
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: `${theme.spacing(2.5)}px`,
            },
        },
    }),
);
