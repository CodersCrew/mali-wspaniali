import React, { FormEvent, useState } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core/';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User, UserCredential } from '../../firebase/firebase';
import { handleSignInWithEmailAndPassword, onAuthStateChanged, getUserRole } from '../../queries/authQueries';

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
        setEmail('');
        setPassword('');
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
        <>
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
                        helperText={t('login-page.e-mail-helper-text')}
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
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '20px', float: 'right', alignSelf: 'flex-end' }}
                    >
                        {t('login-page.login')}
                    </Button>
                </form>
                <span>{loginError && t('login-page.login-error')}</span>
            </div>
        </>
    );
};

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
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
});
