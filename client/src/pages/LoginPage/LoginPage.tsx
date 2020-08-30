import React, { FormEvent, useState } from 'react';
import { TextField, makeStyles, createStyles } from '@material-ui/core/';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@apollo/client';
import { Theme } from '../../theme/types';
import { ButtonSecondary } from '../../components/Button';
import { AUTHORIZE_USER, GET_ME } from '../../graphql/userRepository';

const initialError: Error = {
    name: '',
    message: '',
};

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(initialError);
    const { t } = useTranslation();
    const classes = useStyles();
    const history = useHistory();
    const [authorizeUser] = useMutation(AUTHORIZE_USER);
    const { refetch } = useQuery(GET_ME);

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        authorizeUser({
            variables: { user: { mail: email, password } },
            update: (cache, { data: { login } }) => {
                localStorage.setItem('token', login.token);

                refetch()
                    .then(({ data }) => {
                        if (data) {
                            history.push(`/${data.me.role}`);
                        }
                    })
                    .catch((e) => setLoginError(e));
            },
        });

        event.preventDefault();
    };

    const { name } = loginError;

    return (
        <div className={classes.container}>
            <form
                onSubmit={handleSubmit}
                autoComplete="off"
                className={classes.form}
            >
                <div className={classes.loginHeader}>
                    {t('login-page.login-header')}
                </div>
                <TextField
                    required
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                    id="email"
                    label={t('e-mail')}
                    variant="outlined"
                    error={name === 'auth/user-not-found'}
                    helperText={
                        name === 'auth/user-not-found'
                            ? t('login-page.login-notfound')
                            : t('login-page.e-mail-helper-text')
                    }
                    className={classes.formItem}
                />
                <TextField
                    required
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                    id="password"
                    label={t('password')}
                    type="password"
                    variant="outlined"
                    error={Boolean(name)}
                    helperText={name ? t('login-page.login-error') : ''}
                    className={classes.formItem}
                />
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
            </form>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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

            [theme.breakpoints.down('sm')]: {
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

            [theme.breakpoints.down('sm')]: {
                marginTop: '40px',
            },
        },
        submitWrapper: {
            marginTop: '20px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',

            [theme.breakpoints.down('sm')]: {
                margin: '0 0 20px 0',
            },
        },
        forgotPasswordButton: {
            textAlign: 'center',
            whiteSpace: 'normal',
            fontSize: '12px',
        },
    }),
);
