import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, Typography, createStyles, Box } from '@material-ui/core';
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
            <div className={classes.layout}>
                <img
                    className={classes.image}
                    src={getImageSource(imageState)}
                    alt={t('forgot-password-page.avatar')}
                />
                <Typography variant="h3" className={classes.title}>
                    <Box fontWeight='fontWeightMedium'>
                        {t('forgot-password-page.forgot-password')}
                    </Box>
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
                <div className={classes.underlinedText}>
                    <Typography variant="caption">
                        <Box fontWeight='fontWeightMedium'>
                            {t('forgot-password-page.problem')}
                        </Box>
                    </Typography>
                    <Typography variant="caption">
                        <Box fontWeight='fontWeightMedium'>
                            {t('forgot-password-page.contact')}
                        </Box>
                    </Typography>
                </div>
                <ButtonSecondary variant='text' href='/'>
                    <Typography variant='subtitle1' >
                        <Box fontWeight='fontWeightMedium'>
                            {t('forgot-password-page.back-to-login')}
                        </Box>
                    </Typography> 
                </ButtonSecondary>
            </div>
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
        },
        header: {
            marginLeft: 'auto',
        },
        layout: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            width: '80%',
            minHeight: '85vh',

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
        underlinedText: {
            textAlign: 'center',
            position: 'relative',
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',

            '&::after': {
                position: 'absolute',
                content: '""',
                height: '1px',
                margin: '0 auto',
                left: '0',
                bottom: '-2px',
                right: '0',
                width: '100%',
                background: 'black',
            },
        },
        footer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 'auto',
            marginBottom: theme.spacing(4),
        },
    }),
);
