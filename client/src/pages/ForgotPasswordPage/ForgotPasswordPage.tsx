import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, Typography, createStyles, Box, Link } from '@material-ui/core';
import { ResetPasswordForm } from './ResetPasswordForm';
import { ResetPasswordConfirmation } from './ResetPasswordConfirmation';
import { isValidEmail } from './isValidEmail';
import DefaultImage from '../../assets/forgotPassword/default.png';
import ErrorImage from '../../assets/forgotPassword/error.png';
import SuccessImage from '../../assets/forgotPassword/success.png';
import { Theme } from '../../theme/types';
import { useResetPassword } from '../../operations/mutations/User/resetPassword';
import { ButtonSecondary } from '../../components/Button';
import { LanguageSelector } from '../../components/LanguageSelector';
import dayjs from '../../localizedMoment';
import { useIsDevice } from '../../queries/useBreakpoints';

type ImageState = 'DEFAULT' | 'ERROR' | 'SUCCESS';

export default function ForgotPasswordPage() {
    const classes = useStyles();
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [imageState, setImageState] = useState<ImageState>('ERROR');
    const { i18n } = useTranslation();
    const language = localStorage.getItem('i18nextLng')!;
    const [resetPasswordState, setResetPasswordState] = useState<'FORM' | 'CONFIRMATION'>('FORM');
    const { resetPassword } = useResetPassword(
        () => setImageState('SUCCESS'),
        () => setImageState('ERROR'),
    );
    const { isMobile } = useIsDevice();

    const handleLanguageChange = (lng: string) => {
        dayjs.locale(lng);

        return i18n.changeLanguage(lng);
    };

    const handleInputChange = (value: string): void => {
        if (value === '') {
            setEmail('');

            return setImageState('ERROR');
        }

        const validEmail = isValidEmail(value);

        setImageState(validEmail ? 'SUCCESS' : 'DEFAULT');

        return setEmail(value);
    };

    const handleCreateNewPassword = () => {
        setResetPasswordState('CONFIRMATION');

        resetPassword(email);
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
            <div className={classes.header}>
                <LanguageSelector language={language} onClick={handleLanguageChange} />
            </div>
            <Box
                display="flex"
                justifyContent="space-around"
                alignItems="center"
                flexDirection="column"
                width={isMobile ? '90%' : '80%'}
                flex={1}
            >
                <div className={classes.layout}>
                    <img
                        className={classes.image}
                        src={getImageSource(imageState)}
                        alt={t('forgot-password-page.avatar')}
                    />
                    <Typography variant="h4" className={classes.title}>
                        {t('forgot-password-page.forgot-password')}
                    </Typography>
                    {resetPasswordState === 'FORM' ? (
                        <ResetPasswordForm
                            onChange={handleInputChange}
                            onSubmit={handleCreateNewPassword}
                            isDisabled={!isValidEmail(email)}
                            email={email}
                        />
                    ) : (
                        <ResetPasswordConfirmation />
                    )}
                </div>
                <div className={classes.footer}>
                    <Typography variant="caption">{t('forgot-password-page.problem')}</Typography>
                    <Link underline="always" color="textPrimary">
                        <Typography variant="caption">{t('forgot-password-page.contact')}</Typography>
                    </Link>
                    <Box mt={3}>
                        <ButtonSecondary variant="text" href="/">
                            {t('forgot-password-page.back-to-login')}
                        </ButtonSecondary>
                    </Box>
                </div>
            </Box>
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flex: 1,
            minHeight: '100vh',
        },
        header: {
            marginLeft: 'auto',
        },
        layout: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '80%',

            [theme.breakpoints.down('sm')]: {
                width: '90%',
                maxWidth: '480px',
                margin: '0 15px',
            },
        },
        title: {
            textAlign: 'center',
            marginBottom: '20px',
            marginTop: '20px',
            textTransform: 'uppercase',
        },
        image: {
            borderRadius: '50%',
            width: '214px',
            [theme.breakpoints.down('sm')]: {
                width: '150px',
                marginTop: '40px',
            },
        },
        footer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    }),
);
