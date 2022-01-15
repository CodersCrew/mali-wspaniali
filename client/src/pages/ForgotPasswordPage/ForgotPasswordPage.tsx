import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, Typography, createStyles, Box, Link } from '@material-ui/core';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';

import DefaultImage from '../../assets/forgotPassword/default.png';
import ErrorImage from '../../assets/forgotPassword/error.png';
import SuccessImage from '../../assets/forgotPassword/success.png';
import { Theme } from '../../theme';
import { useResetPassword } from '../../operations/mutations/User/resetPassword';
import { ButtonSecondary } from '../../components/Button';
import { openSnackbar } from '../../components/Snackbar/openSnackbar';
import { emailTest } from '../../utils/emailTest';
import { useIsDevice } from '../../queries/useBreakpoints';

import { ResetPasswordForm } from './ResetPasswordForm';

type ImageState = 'DEFAULT' | 'ERROR' | 'SUCCESS';

export default function ForgotPasswordPage() {
    const classes = useStyles();
    const { t } = useTranslation();
    const { isDesktop } = useIsDevice();
    const history = useHistory();
    const { resetPassword } = useResetPassword(
        () => setImageState('SUCCESS'),
        () => setImageState('ERROR'),
    );

    const [email, setEmail] = React.useState('');
    const [imageState, setImageState] = React.useState<ImageState>('ERROR');

    return (
        <div className={classes.container}>
            <div
                className={clsx({
                    [classes.innerContainer]: true,
                    [classes.innerContainerMobile]: !isDesktop,
                })}
            >
                <img
                    className={clsx({
                        [classes.image]: true,
                        [classes.imageMobile]: !isDesktop,
                    })}
                    src={getImageSource(imageState)}
                    alt={t('forgot-password-page.avatar')}
                />
                <Typography
                    variant="h4"
                    className={clsx({
                        [classes.title]: true,
                        [classes.titleMobile]: !isDesktop,
                    })}
                >
                    {t('forgot-password-page.forgot-password')}
                </Typography>
                <ResetPasswordForm onChange={handleInputChange} onSubmit={handleCreateNewPassword} email={email} />
                <Box className={classes.separator} />
            </div>
            <div
                className={clsx({
                    [classes.footer]: true,
                    [classes.footerMobile]: !isDesktop,
                })}
            >
                <Typography variant="caption">{t('forgot-password-page.problem')}</Typography>
                <Link underline="always" color="textPrimary" href={`mailto:${t('forgot-password-page.mailto')}`}>
                    <Typography variant="caption">{t('forgot-password-page.contact')}</Typography>
                </Link>
                <ButtonSecondary variant="text" className={classes.backToLoginButton} onClick={() => history.push('/')}>
                    {t('forgot-password-page.back-to-login')}
                </ButtonSecondary>
            </div>
        </div>
    );

    function handleInputChange(value: string): void {
        if (value === '') {
            setEmail('');

            return setImageState('ERROR');
        }

        setImageState(emailTest(value) ? 'SUCCESS' : 'DEFAULT');

        return setEmail(value);
    }

    function handleCreateNewPassword() {
        onPasswordChange(t('settings-page.password-change-message'));
        resetPassword(email);
    }

    function onPasswordChange(text: string) {
        openSnackbar({ text });
    }

    function getImageSource(state: ImageState) {
        const options = {
            DEFAULT: DefaultImage,
            SUCCESS: SuccessImage,
            ERROR: ErrorImage,
        };

        return options[state];
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        innerContainer: {
            width: '100%',
            minWidth: 'calc(328px + 2 * 24px)',
            padding: theme.spacing(0, 3),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        innerContainerMobile: {
            justifyContent: 'space-between',
        },
        image: {
            borderRadius: '50%',
            width: theme.spacing(28),
        },
        imageMobile: {
            width: 100,
            marginTop: theme.spacing(4),
        },
        title: {
            textAlign: 'center',
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2),
            textTransform: 'uppercase',
        },
        titleMobile: {
            marginTop: theme.spacing(4),
        },
        separator: {
            marginBottom: '3em',
        },
        footer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        footerMobile: {
            marginTop: 0,
            justifyContent: 'flex-end',
            paddingBottom: theme.spacing(2),
        },
        backToLoginButton: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2.25),
        },
    }),
);
