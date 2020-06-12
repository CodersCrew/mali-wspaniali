import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core/';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { openAlertDialog } from '../../components/AlertDialog';
import { createUser } from '../../queries/userQueries';
import { passwordStrengthTest } from './passwordStrengthTest';

const initialState = {
    email: '',
    password: '',
    passwordConfirm: '',
};

export const RegistrationForm = () => {
    const [form, setForm] = useState(initialState);
    const { email, password, passwordConfirm } = form;
    const classes = useStyles();
    const history = useHistory();
    const { t } = useTranslation();

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (!passwordStrengthTest(password)) {
            openAlertDialog({
                type: 'error',
                description: t('registration-page.password-not-strong'),
            });
        } else if (password !== passwordConfirm) {
            openAlertDialog({
                type: 'error',
                description: t('registration-page.password-mismatch'),
            });
        } else {
            const user = { email, password };
            createUser(user)
                .then(() => {
                    history.push('/login');
                })
                .catch(err => {
                    openAlertDialog({ type: 'error', description: err.message });
                });
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { id, value } = event.target;
        setForm(prevForm => ({
            ...prevForm,
            [id]: value,
        }));
    };

    return (
        <form className="registration-form" autoComplete="off" onSubmit={handleSubmit}>
            <TextField
                required
                onChange={handleChange}
                value={email}
                id="email"
                type="email"
                label="E-mail"
                inputProps={{
                    'data-testid': 'email',
                }}
                fullWidth
            />
            <TextField
                required
                onChange={handleChange}
                value={password}
                id="password"
                type="password"
                label={t('password')}
                inputProps={{
                    'data-testid': 'password',
                }}
                fullWidth
            />
            <TextField
                required
                onChange={handleChange}
                value={passwordConfirm}
                id="passwordConfirm"
                type="password"
                label={t('registration-page.password-confirm')}
                inputProps={{
                    'data-testid': 'confirmPassword',
                }}
                fullWidth
            />
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
                {t('registration-page.register')}
            </Button>
        </form>
    );
};

const useStyles = makeStyles({
    button: {
        marginTop: '20px',
        float: 'right',
    },
});
