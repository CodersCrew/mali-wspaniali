import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, Typography, createStyles } from '@material-ui/core';
import { ResetPasswordForm } from './ResetPasswordForm';
import { ResetPasswordConfirmation } from './ResetPasswordConfirmation';
import { isValidEmail } from './isValidEmail';
import DefaultImage from '../../assets/forgotPassword/default.png';
import ErrorImage from '../../assets/forgotPassword/error.png';
import SuccessImage from '../../assets/forgotPassword/success.png';
import { Theme } from '../../theme/types';
import { useResetPassword } from '../../operations/mutations/User/resetPassword';

type ImageState = 'DEFAULT' | 'ERROR' | 'SUCCESS';

export default function ForgotPasswordPage() {
    const classes = useStyles();
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [imageState, setImageState] = useState<ImageState>('ERROR');
    const [resetPasswordState, setResetPasswordState] = useState<'FORM' | 'CONFIRMATION'>('FORM');
    const { resetPassword } = useResetPassword(
        () => setImageState('SUCCESS'),
        () => setImageState('ERROR'),
    );

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
            <div className={classes.layout}>
                <img
                    className={classes.image}
                    src={getImageSource(imageState)}
                    alt={t('forgot-password-page.avatar')}
                />
                <Typography variant="h3" className={classes.title}>
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
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100%',
        },
        layout: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '70%',
            minHeight: '90vh',

            [theme.breakpoints.down('sm')]: {
                minHeight: 'auto',
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
                width: '100px',
                marginTop: '40px',
            },
        },
    }),
);
