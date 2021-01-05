import React, { FormEvent, useState } from 'react';
import { TextField, makeStyles, createStyles } from '@material-ui/core/';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Theme } from '../../theme/types';
import { ButtonSecondary } from '../../components/Button';
import { useAuthorizeMe } from '../../operations/mutations/User/authorizeMe';
import { openBtnSnackbar } from '../../components/Snackbar/openBtnSnackbar';
import { validateLoginData } from './validateLoginData';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { t } = useTranslation();
    const classes = useStyles();
    const history = useHistory();
    const { authorizeMe } = useAuthorizeMe(
        user => {
            history.push(`/${user.role}`);
        },
        error => {
            openBtnSnackbar({ text: t(error.name), severity: 'error', btnText: 'OK' });
        },
    );

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (!validateLoginData(email, password)) {
            openBtnSnackbar({ text: t('login-page.login-client-error'), severity: 'error', btnText: 'OK' });

            return;
        }
        authorizeMe(email, password);
    };

    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit} autoComplete="off" className={classes.form}>
                <div className={classes.loginHeader}>{t('login-page.login-header')}</div>
                <TextField
                    required
                    onChange={({ target: { value } }) => setEmail(value)}
                    value={email}
                    id="email"
                    label={t('e-mail')}
                    variant="outlined"
                    helperText={t('login-page.e-mail-helper-text')}
                    className={classes.formItem}
                />
                <TextField
                    required
                    onChange={({ target: { value } }) => setPassword(value)}
                    value={password}
                    id="password"
                    label={t('password')}
                    type="password"
                    variant="outlined"
                    helperText=""
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
