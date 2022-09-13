import { Box, createStyles, makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import PasswordChangeSuccess from '@app/assets/forgotPassword/password-change-success.svg';
import { ButtonSecondary } from '../../components/Button';
import { Theme } from '@app/theme';
import { useIsDevice } from '../../queries/useBreakpoints';

export const PasswordSuccessfullyChanged = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const { isDesktop } = useIsDevice();

    return (
        <div
            className={clsx({
                [classes.successLayout]: true,
                [classes.successLayoutMobile]: !isDesktop,
            })}
        >
            <img
                src={PasswordChangeSuccess}
                alt=""
                className={clsx({
                    [classes.passwordChangeSuccessImage]: isDesktop,
                    [classes.passwordChangeSuccessImageMobile]: !isDesktop,
                })}
            />
            <Box mb={5} />
            <Typography variant="h3" className={classes.successTitle}>
                {t('password-change-success-page.password-change-success-title')}
            </Typography>
            <Box mb={2} />
            <Typography
                variant="subtitle1"
                className={clsx({
                    [classes.successSubtitle]: true,
                    [classes.successSubtitleMobile]: !isDesktop,
                })}
            >
                {t('password-change-success-page.password-change-success-subtitle')}
            </Typography>
            <Box mb={5} />
            <Link to="/login">
                <ButtonSecondary
                    variant="contained"
                    type="button"
                    innerText={t('password-change-success-page.login')}
                />
            </Link>
            <Box mb={3} />
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
        },
        successLayoutMobile: {
            padding: theme.spacing(0, 6),
            marginTop: theme.spacing(8),
        },
        passwordChangeSuccessImage: {
            height: 341,
        },
        passwordChangeSuccessImageMobile: {
            height: 257,
        },
        successTitle: {
            textAlign: 'center',
            [theme.breakpoints.down('sm')]: {
                lineHeight: `${theme.spacing(3)}px`,
            },
        },
        successSubtitle: {
            textAlign: 'center',
            padding: theme.spacing(0, 10.5),
        },
        successSubtitleMobile: {
            padding: 0,
            lineHeight: `${theme.spacing(2.5)}px`,
        },
    }),
);
