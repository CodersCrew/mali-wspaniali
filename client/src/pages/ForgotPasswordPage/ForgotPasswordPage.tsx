import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, Typography, createStyles, Box, Link } from '@material-ui/core';

import DefaultImage from '../../assets/forgotPassword/default.png';
import ErrorImage from '../../assets/forgotPassword/error.png';
import SuccessImage from '../../assets/forgotPassword/success.png';
import { Theme } from '../../theme';
import { useResetPassword } from '../../operations/mutations/User/resetPassword';
import { ButtonSecondary } from '../../components/Button';
import { openSnackbar } from '../../components/Snackbar/openSnackbar';
import { emailTest } from '../../utils/emailTest';

import { ResetPasswordForm } from './ResetPasswordForm';

type ImageState = 'DEFAULT' | 'ERROR' | 'SUCCESS';

export default function ForgotPasswordPage() {
    const classes = useStyles();
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [imageState, setImageState] = useState<ImageState>('ERROR');
    const { resetPassword } = useResetPassword(
        () => setImageState('SUCCESS'),
        () => setImageState('ERROR'),
    );

    const handleInputChange = (value: string): void => {
        if (value === '') {
            setEmail('');

            return setImageState('ERROR');
        }

        setImageState(emailTest(value) ? 'SUCCESS' : 'DEFAULT');

        return setEmail(value);
    };

    const handleCreateNewPassword = () => {
        onPasswordChange(t('settings-page.password-change-message'));
        resetPassword(email);
    };

    const onPasswordChange = (text: string) => {
        openSnackbar({ text });
    };

    const getImageSource = (state: ImageState) => {
        const options = {
            DEFAULT: DefaultImage,
            SUCCESS: SuccessImage,
            ERROR: ErrorImage,
        };

        return options[state];
    };

    return (
        <div className={classes.container}>
            <div className={classes.innerContainer}>
                <img
                    className={classes.image}
                    src={getImageSource(imageState)}
                    alt={t('forgot-password-page.avatar')}
                />
                <Typography variant="h4" className={classes.title}>
                    {t('forgot-password-page.forgot-password')}
                </Typography>
                <ResetPasswordForm onChange={handleInputChange} onSubmit={handleCreateNewPassword} email={email} />
                <Box className={classes.separator} />
            </div>
            <div className={classes.footer}>
                <Typography variant="caption">{t('forgot-password-page.problem')}</Typography>
                <Link underline="always" color="textPrimary" href="mailto:test@test.pl">
                    <Typography variant="caption">{t('forgot-password-page.contact')}</Typography>
                </Link>
                <ButtonSecondary variant="text" href="/" className={classes.backToLoginButton}>
                    {t('forgot-password-page.back-to-login')}
                </ButtonSecondary>
            </div>
        </div>
    );
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
            padding: theme.spacing(0, 3),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            },
        },
        image: {
            borderRadius: '50%',
            width: theme.spacing(28),
            [theme.breakpoints.down('sm')]: {
                width: 100,
            },
        },
        title: {
            textAlign: 'center',
            marginBottom: '20px',
            marginTop: '20px',
            textTransform: 'uppercase',
            [theme.breakpoints.down('sm')]: {
                fontSize: '20px',
                fontWeight: '500',
                marginTop: theme.spacing(5),
                marginBottom: theme.spacing(2),
            },
        },
        separator: {
            marginBottom: '3em',
        },
        footer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
                marginTop: 0,
                justifyContent: 'flex-end',
                paddingBottom: theme.spacing(2),
            },
        },
        backToLoginButton: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2.25),
        },
    }),
);
