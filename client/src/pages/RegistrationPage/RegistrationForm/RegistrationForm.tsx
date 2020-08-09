import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, StepContent, Typography, Container } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { openAlertDialog } from '../../../components/AlertDialog';
import { load } from '../../../utils/load';
import { createUser } from '../../../queries/userQueries';
import { passwordStrengthTest } from '../passwordStrengthTest';
import { useStyles } from './styles';
import { RegistrationEmail } from './RegistrationEmail';
import { RegistrationAgreement } from './RegistrationAgreement';
import { RegistrationPassword } from './RegistrationPassword';
import { RegistrationFeedback } from './RegistrationFeedback';
import { RegistrationCode } from './RegistrationCode';
import { LanguageSelector } from './LanguageSelector';

import { RegisterForm } from './types';
import { Aggrement } from '../../../graphql/types';
import { getAggrements } from '../../../graphql/agreementRepository';

const initialState: RegisterForm = {
    code: '',
    email: '',
    password: '',
    passwordConfirm: '',
};

export const RegistrationForm = () => {
    const [form, setForm] = useState(initialState);
    const [activeStep, setActiveStep] = useState(0);
    const [aggrements, setAggrements] = useState<Aggrement[]>([]);
    const { code, email, password, passwordConfirm } = form;
    const classes = useStyles();
    const { t } = useTranslation();

    useEffect(() => {
        getAggrements().then(({ data: { aggrements } }) => setAggrements(aggrements));
    }, []);

    const steps = [
        t('registration-page.enter-code'),
        t('e-mail'),
        t('registration-page.agreements-and-regulations'),
        t('registration-page.create-password'),
        t('registration-page.confirmation'),
    ];

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <RegistrationCode
                        handleChange={handleChange}
                        handleNext={handleNext}
                        code={code}
                        classForm={classes.formItem}
                        classButton={classes.buttonWrapper}
                        classNextBtn={classes.nextButton}
                    />
                );
            case 1:
                return (
                    <RegistrationEmail
                        handleChange={handleChange}
                        handleNext={handleNext}
                        handleBack={handleBack}
                        email={email}
                        form={form}
                        classForm={classes.formItem}
                        classButton={clsx({ [classes.buttonWrapper]: true, emailContent: activeStep === 0 })}
                        classNextBtn={classes.nextButton}
                    />
                );
            case 2:
                return (
                    <RegistrationAgreement
                        handleBack={handleBack}
                        handleNext={handleNext}
                        classButton={classes.buttonWrapper}
                        classNextBtn={classes.nextButton}
                        agreementContainer={classes.agreementContainer}
                        agreementHeader={classes.agreementHeader}
                        agreementMoreBtn={classes.agreementMoreBtn}
                        agreementCheckboxHeader={classes.agreementCheckboxHeader}
                        agreementCheckboxWrapper={classes.agreementCheckboxWrapper}
                        agreementText={classes.agreementText}
                        agreementLink={classes.agreementLink}
                        agreementModal={classes.agreementModal}
                        agreementPanel={classes.agreementPanel}
                        agreementCheckbox={classes.agreementCheckbox}
                        checkboxContent={classes.checkboxContent}
                        agreements={aggrements}
                    />
                );
            case 3:
                return (
                    <RegistrationPassword
                        handleChange={handleChange}
                        handleBack={handleBack}
                        activeStep={activeStep}
                        password={password}
                        passwordConfirm={passwordConfirm}
                        classForm={classes.formItem}
                        classButton={classes.buttonWrapper}
                        classNextBtn={classes.nextButton}
                        classFormItem={classes.formItem}
                    />
                );
            case 4:
                return (
                    <RegistrationFeedback
                        classLink={classes.goToHomepageLink}
                        classHeader={clsx({ [classes.loginHeader]: true, confirmation: activeStep === 3 })}
                        classWrapper={classes.confirmWrapper}
                    />
                );
            default:
                return null;
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
            load(createUser({ mail: email, password, keyCode: code }))
                .then(() => {
                    handleNext();
                })
                .catch(err => {
                    openAlertDialog({
                        type: 'error',
                        description: err.message,
                    });
                });
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { id, value } = event.target;
        setForm(prevForm => ({ ...prevForm, [id]: value }));
    };

    return (
        <div className={clsx({ [classes.container]: true, agreements: activeStep === 2 })}>
            <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
                {activeStep !== 4 && (
                    <Container className={classes.headerContainer}>
                        <Typography variant="h4">
                            <div className={classes.registrationHeader}>{t('registration-page.register')}</div>
                        </Typography>
                        <LanguageSelector />
                    </Container>
                )}
                <Stepper activeStep={activeStep} orientation="vertical" className={classes.stepper}>
                    {steps.map((step, idx) => (
                        <Step key={step} style={{ border: 'none' }}>
                            <StepLabel>{step}</StepLabel>
                            <StepContent>{getStepContent(idx)}</StepContent>
                        </Step>
                    ))}
                </Stepper>
            </form>
        </div>
    );
};
