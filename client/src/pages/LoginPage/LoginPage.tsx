import React, { FormEvent, useState } from 'react';
import { TextField, makeStyles, createStyles, Typography, Box, Divider } from '@material-ui/core/';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ButtonSecondary } from '../../components/Button';
import { Theme } from '../../theme/types';
import { useAuthorizeMe } from '../../operations/mutations/User/authorizeMe';
import { useIsDevice } from '../../queries/useBreakpoints';
import { LanguageSelector } from '../RegistrationPage/RegistrationForm/LanguageSelector';
import { openSnackbar } from '../../components/Snackbar/openSnackbar';

const initialError: Error = {
    name: '',
    message: '',
};

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(initialError);
    const { t } = useTranslation();
    const classes = useStyles();
    const history = useHistory();
    const { authorizeMe } = useAuthorizeMe(
        (user) => {
            history.push(`/${user.role}`);
        },
        (error) => {
            setLoginError(error);
            showLoginErrorMessage();
        },
    );
    const { isDesktop } = useIsDevice();

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        authorizeMe(email, password);
    };

    const showLoginErrorMessage = () => {
        openSnackbar({
            text: t('login-page.login-error'),
            severity: 'error',
            anchor: { vertical: isDesktop ? 'top' : 'bottom', horizontal: 'center' },
        });
    };

    return (
        <div className={classes.container}>
            <div className={classes.topHeader}>
                <LanguageSelector />
            </div>
            <div className={classes.innerContainer}>
                <form onSubmit={handleSubmit} autoComplete="off" className={classes.form}>
                    <Typography variant="h3" className={classes.loginHeader}>
                        {t('login-page.login-header')}
                    </Typography>
                    {isDesktop ? (
                        <Box mb={6} />
                    ) : (
                        <>
                            <Typography className={classes.welcomeText}>{t('login-wrapper.welcome-text')}</Typography>
                            <Box mb={5} />
                        </>
                    )}
                    <TextField
                        required
                        onChange={({ target: { value } }) => setEmail(value)}
                        value={email}
                        id="email"
                        label={t('e-mail')}
                        variant="outlined"
                        error={!!loginError.message}
                        helperText={t('login-page.e-mail-helper-text')}
                        className={classes.formItem}
                    />
                    <Box mb={2} />
                    <TextField
                        required
                        onChange={({ target: { value } }) => setPassword(value)}
                        value={password}
                        id="password"
                        label={t('password')}
                        type="password"
                        variant="outlined"
                        error={!!loginError.message}
                        className={classes.formItem}
                    />
                    <Box mb={6} />
                    <div className={classes.submitWrapper}>
                        <ButtonSecondary
                            variant="text"
                            href="/forgot-password"
                            innerText={t('login-page.forgot-password')}
                            className={classes.forgotPasswordButton}
                        />
                        <ButtonSecondary
                            variant="contained"
                            type="submit"
                            disabled={!email || !password}
                            innerText={t('login-page.login')}
                        />
                    </div>

                    <>
                        <Box mb={isDesktop ? 7 : 4.5} />
                        <Divider className={classes.divider} orientation="horizontal" variant="fullWidth" />
                        <Box mb={isDesktop ? 7 : 4} />
                    </>
                </form>
                <div className={classes.registerWrapper}>
                    <Typography>{t('login-page.no-account')} </Typography>
                    <Box mb={3.5} />
                    <ButtonSecondary
                        variant="text"
                        href="/register"
                        innerText={t('login-page.register')}
                        className={classes.forgotPasswordButton}
                    />
                </div>
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
            padding: theme.spacing(0, 2),
            [theme.breakpoints.down('md')]: {
                justifyContent: 'start',
            },
        },
        topHeader: {
            width: '100%',
            height: 56,
            minHeight: 56,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        innerContainer: {
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 112px)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80%',
            [theme.breakpoints.down('md')]: {
                minHeight: 'auto',
                width: '100%',
                marginTop: theme.spacing(8),
            },
        },
        formItem: {
            width: '100%',
            maxWidth: 500,
            minWidth: 328,
            [theme.breakpoints.down('md')]: {
                margin: 0,
            },
        },
        loginHeader: {
            [theme.breakpoints.down('md')]: {
                marginTop: theme.spacing(4),
            },
        },
        submitWrapper: {
            width: '100%',
            maxWidth: 500,
            minWidth: 328,
            display: 'flex',
            marginDown: 'auto',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        registerWrapper: {
            maxWidth: 500,
            minWidth: 328,
            textAlign: 'center',
        },
        registerLink: {
            marginLeft: 5,
        },
        forgotPasswordButton: {
            textAlign: 'center',
            whiteSpace: 'normal',
            fontSize: '12px',
        },
        welcomeText: {
            marginTop: theme.spacing(3),
            textAlign: 'center',
            minWidth: 328,
        },
        divider: {
            width: '100%',
        },
    }),
);
