import React, { FormEvent, useState } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core/';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@material-ui/core/styles';
import { User, UserCredential } from '../../firebase/firebase';
import { handleSignInWithEmailAndPassword, onAuthStateChanged, getUserRole } from '../../queries/authQueries';
import { backgroundColor, secondaryColor } from '../../colors';
import { theme } from '../../theme';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const { t } = useTranslation();
    const classes = useStyles();
    const history = useHistory();

    const handleSubmitSuccess = ({ user }: UserCredential) => {
        if (user) history.push('/');
    };

    const handleSubmitError = (error: Error) => setLoginError(error.message);

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        handleSignInWithEmailAndPassword(email, password, handleSubmitSuccess, handleSubmitError);
    };

    onAuthStateChanged(async (user: User | null) => {
        if (user) {
            const role = await getUserRole(user);
            if (role) {
                history.push(`/${role}`);
            }
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.container}>
                <form onSubmit={handleSubmit} autoComplete="off" className={classes.form}>
                    <div className={classes.loginHeader}>{t('login-page.login-header')}</div>
                    <TextField
                        required
                        onChange={event => setEmail(event.target.value)}
                        value={email}
                        id="email"
                        label={t('e-mail')}
                        variant="outlined"
                        error={loginError !== ''}
                        helperText={loginError ? t('login-page.login-error') : t('login-page.e-mail-helper-text')}
                        className={classes.formItem}
                    />
                    <TextField
                        required
                        onChange={event => setPassword(event.target.value)}
                        value={password}
                        id="password"
                        label={t('password')}
                        type="password"
                        variant="outlined"
                        error={loginError !== ''}
                        helperText={loginError ? t('login-page.login-error') : ''}
                        className={classes.formItem}
                    />
                    <div className={classes.submitWrapper}>
                        <Link className={classes.forgotPasswordLink} to="/">
                            {t('login-page.forgot-password')}
                        </Link>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={!email || !password}
                            color="secondary"
                            className={classes.loginButton}
                        >
                            {t('login-page.login')}
                        </Button>
                    </div>
                </form>
            </div>
        </ThemeProvider>
    );
};

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        minHeight: '90vh',

        '@media (max-width:767px)': {
            minHeight: 'auto',
            width: '100%',
            margin: '0 15px',
        },
    },
    formItem: {
        margin: '20px',
        width: '100%',
    },
    loginHeader: {
        textAlign: 'center',
        fontFamily: 'Montserrat',
        fontSize: '21px',
        fontWeight: 'bold',
        marginBottom: '25px',
        textTransform: 'uppercase',

        '@media (max-width:767px)': {
            marginTop: '40px',
        },
    },
    submitWrapper: {
        marginTop: '20px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        '@media (max-width:767px)': {
            margin: '0 0 20px 0',
        },
    },
    loginButton: {
        color: backgroundColor,
        fontWeight: 'bold',
    },
    forgotPasswordLink: {
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '17px',
        textAlign: 'center',
        textTransform: 'uppercase',
        color: secondaryColor,
        textDecoration: 'none',
    },
});
