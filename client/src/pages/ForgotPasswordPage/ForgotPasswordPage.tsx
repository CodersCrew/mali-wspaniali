import React, { useState, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { PresentPasswordPage } from './PresentPasswordPage';
import { PostsentPasswordPage } from './PostsentPasswordPage';
import { makeStyles, Typography, createStyles } from '@material-ui/core';
import { handlePasswordReset } from '../../queries/authQueries';
import { isValidEmail } from './isValidEmail';
import DefaultImage from '../../assets/forgotPassword/default.png';
import ErrorImage from '../../assets/forgotPassword/error.png';
import SuccessImage from '../../assets/forgotPassword/success.png';
import { Theme } from '../../theme/types';

enum ImageState {
    default = 'DEFAULT',
    error = 'ERROR',
    success = 'SUCCESS',
}

export const ForgotPasswordPage = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [imageState, setImageState] = useState<ImageState>(ImageState.default);
    const [isResetEmailSent, setIsResetEmailSent] = useState(false);

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { value } = event.target;
        const validEmail = isValidEmail(value);

        setImageState(ImageState[validEmail ? 'success' : 'error']);
        if (value === '') setImageState(ImageState.default);
        setEmail(event.target.value);
    };

    const handleCreateNewPassword = () => {
        setImageState(ImageState.success);
        handlePasswordReset(email)
            .then(() => setIsResetEmailSent(true))
            .catch(() => setIsResetEmailSent(true));
    };

    const getImageSource = (_imageState: ImageState) => {
        if (_imageState === ImageState.error) return ErrorImage;
        if (_imageState === ImageState.success) return SuccessImage;

        return DefaultImage;
    };

    return (
        <div className={classes.container}>
            <div className={classes.layout}>
                <img className={classes.image} src={getImageSource(imageState)} alt="małgosia czy jak jej tam" />
                <Typography variant="h3" className={classes.title}>
                    {t('forgot-password-page.forgot-password')}
                </Typography>
                {isResetEmailSent ? (
                    <PostsentPasswordPage />
                ) : (
                    <PresentPasswordPage
                        handleInputChange={handleInputChange}
                        handleCreateNewPassword={handleCreateNewPassword}
                        email={email}
                    />
                )}
            </div>
        </div>
    );
};

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
