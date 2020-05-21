import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TextField, Button, makeStyles, Stepper, Step, StepLabel, StepContent } from '@material-ui/core/';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@material-ui/core/styles';
import { openAlertDialog } from '../../components/AlertDialog';
import { load } from '../../utils/load';
import { createUser } from '../../queries/userQueries';
import { passwordStrengthTest } from './passwordStrengthTest';
// import { backgroundColor, secondaryColor } from '../../colors';
import { theme } from '../../theme';

const initialState = {
    email: '',
    password: '',
    passwordConfirm: '',
};

export const RegistrationForm = () => {
    const [form, setForm] = useState(initialState);
    const [activeStep, setActiveStep] = useState(0);
    const { email, password, passwordConfirm } = form;
    const classes = useStyles();
    const history = useHistory();
    const { t } = useTranslation();

    const steps = [
        `${t('e-mail')}`,
        `${t('registration-page.agreements-and-regulations')}`,
        `${t('registration-page.create-password')}`,
        `${t('registration-page.confirmation')}`,
    ];

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <TextField
                        required
                        onChange={handleChange}
                        value={email}
                        id="email"
                        type="email"
                        label={t('e-mail')}
                        variant="outlined"
                        inputProps={{
                            'data-testid': 'email',
                        }}
                        className={classes.formItem}
                    />
                );

            case 1:
                return 'blablabla';
            case 2:
                return 'blablabla';
            case 3:
                return 'blablabla';

            default:
                return 'Unknown step';
        }
    };

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

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
            load(createUser(user))
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
        <ThemeProvider theme={theme}>
            <div className={classes.container}>
                <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
                    <div className={classes.loginHeader}>{t('registration-page.register')}</div>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((label, idx) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                                <StepContent>
                                    <div>{getStepContent(idx)}</div>
                                    <div>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            className={classes.button}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                    {/* <TextField
                        required
                        onChange={handleChange}
                        value={email}
                        id="email"
                        type="email"
                        label={t('e-mail')}
                        variant="outlined"
                        inputProps={{
                            'data-testid': 'email',
                        }}
                        className={classes.formItem}
                    />
                    <TextField
                        required
                        onChange={handleChange}
                        value={password}
                        id="password"
                        type="password"
                        label={t('password')}
                        variant="outlined"
                        inputProps={{
                            'data-testid': 'password',
                        }}
                        className={classes.formItem}
                    />
                    <TextField
                        required
                        onChange={handleChange}
                        value={passwordConfirm}
                        id="passwordConfirm"
                        type="password"
                        label={t('registration-page.password-confirm')}
                        variant="outlined"
                        inputProps={{
                            'data-testid': 'confirmPassword',
                        }}
                        className={classes.formItem}
                    /> */}
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                        {t('registration-page.register')}
                    </Button>
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
    button: {
        marginTop: '20px',
        float: 'right',
    },
});
