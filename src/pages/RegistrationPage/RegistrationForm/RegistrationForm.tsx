import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, StepContent } from '@material-ui/core/';
// import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@material-ui/core/styles';
import clsx from 'clsx';
import { openAlertDialog } from '../../../components/AlertDialog';
import { load } from '../../../utils/load';
import { createUser } from '../../../queries/userQueries';
import { passwordStrengthTest } from '../passwordStrengthTest';
import { useStyles } from './styles';
import { theme } from '../../../theme';
import { RegistrationEmail } from './RegistrationEmail';
import { RegistrationAgreement } from './RegistrationAgreement';
import { RegistrationPassword } from './RegistrationPassword';
import { RegistrationFeedback } from './RegistrationFeedback';
import { getAgreements } from '../../../queries/agreementQueries';
import { AdminAgreement } from '../../../firebase/types';

const initialState = {
    email: '',
    password: '',
    passwordConfirm: '',
};

export const RegistrationForm = () => {
    const [form, setForm] = useState(initialState);
    const [activeStep, setActiveStep] = useState(0);
    const [agreements, setAgreements] = useState<AdminAgreement[]>([]);
    const { email, password, passwordConfirm } = form;
    const classes = useStyles();
    // const history = useHistory();
    const { t } = useTranslation();

    useEffect(() => {
        const fetchAgreements = async () => {
            const res = await getAgreements();
            setAgreements(res.agreement);
        };
        fetchAgreements();
    }, []);

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
                    <RegistrationEmail
                        handleChange={handleChange}
                        handleNext={handleNext}
                        email={email}
                        form={form}
                        classForm={classes.formItem}
                        classButton={clsx(classes.buttonWrapper, activeStep === 0 && 'emailContent')}
                        classNextBtn={classes.nextButton}
                    />
                );
            case 1:
                return (
                    <RegistrationAgreement
                        handleBack={handleBack}
                        handleNext={handleNext}
                        activeStep={activeStep}
                        classButton={classes.buttonWrapper}
                        classNextBtn={classes.nextButton}
                        classPrevBtn={classes.prevButton}
                        agreements={agreements}
                    />
                );
            case 2:
                return (
                    <RegistrationPassword
                        handleChange={handleChange}
                        handleBack={handleBack}
                        handleNext={handleNext}
                        activeStep={activeStep}
                        password={password}
                        passwordConfirm={passwordConfirm}
                        classForm={classes.formItem}
                        classButton={classes.buttonWrapper}
                        classNextBtn={classes.nextButton}
                        classPrevBtn={classes.prevButton}
                        classFormItem={classes.formItem}
                    />
                );
            case 3:
                return (
                    <RegistrationFeedback
                        classLink={classes.goToHomepageLink}
                        classHeader={clsx(classes.loginHeader, activeStep === 3 && 'confirmation')}
                        classWrapper={classes.confirmWrapper}
                    />
                );
            default:
                return 'Unknown step';
        }
    };

    const handleNext = () => setActiveStep(prevActiveStep => prevActiveStep + 1);
    const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1);

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
            load(createUser({ email, password }))
                .then(() => {
                    // history.push('/login');
                    handleNext();
                })
                .catch(err => {
                    openAlertDialog({ type: 'error', description: err.message });
                });
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { id, value } = event.target;
        setForm(prevForm => ({ ...prevForm, [id]: value }));
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.container}>
                <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
                    {activeStep !== 3 && <div className={classes.loginHeader}>{t('registration-page.register')}</div>}
                    <Stepper activeStep={activeStep} orientation="vertical" className={classes.stepper}>
                        {steps.map((step, idx) => (
                            <Step key={step} style={{ border: 'none' }}>
                                <StepLabel>{step}</StepLabel>
                                <StepContent>
                                    <>{getStepContent(idx)}</>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                </form>
            </div>
        </ThemeProvider>
    );
};
