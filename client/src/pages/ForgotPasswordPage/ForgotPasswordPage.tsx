import React, { useState, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { TextField, makeStyles, Typography, createStyles } from '@material-ui/core';

import { handlePasswordReset } from '../../queries/authQueries';
import { isValidEmail } from './isValidEmail';

import DefaultImage from '../../assets/forgotPassword/default.png';
import ErrorImage from '../../assets/forgotPassword/error.png';
import SuccessImage from '../../assets/forgotPassword/success.png';
import { Theme } from '../../theme/types';
import { Button } from '../../components/Button';

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

    const renderPostSentJSX = () => (
        <>
            <Typography variant="body1" className={classes.subtitle}>
                {t('forgot-password-page.email-sent')}
            </Typography>
            <Typography variant="body1" className={classes.subtitle}>
                {t('forgot-password-page.when-received')}
            </Typography>
            <Button
                href="/login"
                className={classes.backToLoginButton}
                innerText="forgot-password-page.back-to-login"
            />
        </>
    );

    const renderPreSentJSX = () => (
        <>
            <Typography variant="body1" className={classes.subtitle}>
                {t('forgot-password-page.its-ok')}
            </Typography>
            <Typography variant="body1" className={`${classes.subtitle} ${classes.subtitleThin}`}>
                {t('forgot-password-page.receive-link')}
            </Typography>
            <TextField
                required
                value={email}
                id="email"
                label={t('e-mail')}
                variant="outlined"
                className={classes.textField}
                helperText={t('forgot-password-page.email-helper-text')}
                onChange={handleInputChange}
            />
            <Button
                disabled={!isValidEmail(email)}
                className={classes.createPasswordButton}
                onClick={handleCreateNewPassword}
                innerText="forgot-password-page.new-password"
            />
            <div className={classes.underlinedText}>
                <Typography variant="caption">{t('forgot-password-page.problem')}</Typography>
                <Typography variant="caption">{t('forgot-password-page.contact')}</Typography>
            </div>
        </>
    );

    return (
        <div className={classes.container}>
            <div className={classes.layout}>
                <img className={classes.image} src={getImageSource(imageState)} alt="małgosia czy jak jej tam" />
                <Typography variant="h3" className={classes.title}>
                    {t('forgot-password-page.forgot-password')}
                </Typography>
                {isResetEmailSent ? renderPostSentJSX() : renderPreSentJSX()}
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
        subtitle: {
            textAlign: 'center',
        },
        subtitleThin: {
            marginBottom: '20px',
            width: '320px',
        },
        createPasswordButton: {
            marginBottom: '20px',
            marginTop: '20px',

            [theme.breakpoints.down('sm')]: {
                marginBottom: '44px',
                marginTop: '30px',
            },
        },
        textField: {
            width: '100%',
        },
        image: {
            borderRadius: '50%',
            width: '214px',
            [theme.breakpoints.down('sm')]: {
                width: '100px',
                marginTop: '40px',
            },
        },
        backToLoginButton: {
            marginBottom: '20px',
            marginTop: '40px',
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
    }),
);
