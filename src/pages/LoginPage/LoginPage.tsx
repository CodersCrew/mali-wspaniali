import React, { FormEvent, useState } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core/';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { User, UserCredential } from '../../firebase/firebase';
import { handleSignInWithEmailAndPassword, onAuthStateChanged, getUserRole } from '../../queries/authQueries';
import { mainColor, backgroundColor } from '../../colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: mainColor,
        },
        secondary: {
            main: '#FF7149',
        }
    }
},
);

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

    onAuthStateChanged((user: User | null) => {
        if (user) {
            getUserRole(user).then(role => {
                if (role === 'parent') {
                    history.push('/parent');
                }
                if (role === 'admin') {
                    history.push('/admin');
                }
            });
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <Link to="/">{t('go-to-home-page')}</Link>
            <div className={classes.container}>
                <form onSubmit={handleSubmit} autoComplete="off" className={classes.form}>
                    <div className={classes.loginText}>
                        {t('login-page.login-text')}
                    </div>
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
                        className={classes.formItem}
                    />
                    <div className={classes.submitWrapper}>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={email === '' || password === ''}
                            color="secondary"
                            className={classes.loginButton}
                        >
                            {t('login-page.login')}
                        </Button>
                        <Link className={classes.forgotPasswordLink} to="/">{t('login-page.forgot-password')}</Link>
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
    },
    formItem: {
        margin: '20px',
        width: '100%',
    },
    loginText: {
        textAlign: 'center',
        fontSize: '21px',
        fontWeight: 'bold',
        marginBottom: '25px',
    },
    submitWrapper: {
        marginTop: '20px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    loginButton: {
        color: backgroundColor,
    },
    forgotPasswordLink: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '17px',
        textAlign: 'center',
        textTransform: 'uppercase',
        color: '#FF7149',
        textDecoration: 'none',
    }
});
