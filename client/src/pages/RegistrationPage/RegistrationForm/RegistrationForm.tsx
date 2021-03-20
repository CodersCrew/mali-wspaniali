import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, StepContent, Typography, Box, StepConnector } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { createUser } from '../../../queries/userQueries';
import { getAgreements } from '../../../graphql/agreementRepository';
import { load } from '../../../utils/load';
import { openAlertDialog } from '../../../components/AlertDialog';
import { passwordStrengthTest } from '../passwordStrengthTest';
import { ButtonSecondary } from '../../../components/Button';
import { useIsDevice } from '../../../queries/useBreakpoints';
import { AgreementExtended } from '../types';
import { AGREEMENTS } from '../agreements';

import { RegistrationAgreement } from './RegistrationAgreement';
import { RegistrationCode } from './RegistrationCode';
import { RegistrationEmail } from './RegistrationEmail';
import { RegistrationFeedback } from './RegistrationFeedback';
import { RegistrationPassword } from './RegistrationPassword';
import { RegisterForm } from './types';
import { useStyles } from './styles';
import { LanguageSelector } from './LanguageSelector';

const initialState: RegisterForm = {
    code: '',
    email: '',
    password: '',
    passwordConfirm: '',
};

export const RegistrationForm = () => {
    const [form, setForm] = useState(initialState);
    // TODO: turn back to 0
    const [activeStep, setActiveStep] = useState(2);
    const [skip, setSkip] = useState(false);
    const [loading, setLoading] = useState(false);

    const [agreements, setAgreements] = useState<AgreementExtended[]>([]);
    const { code, email, password, passwordConfirm } = form;
    const classes = useStyles();
    const { t } = useTranslation();
    const { isDesktop } = useIsDevice();

    useEffect(() => {
        getAgreements()
            .then(({ data }) => {
                const agreementList = AGREEMENTS.map((item) => {
                    const id = data.agreements.filter((dataItem) => dataItem.text === item.type)[0]?._id;

                    return { ...item, _id: id === undefined ? '' : id };
                });

                setAgreements(() => agreementList);
            })
            .catch((error) => {
                console.log('Error: ', error.message);
            });
    }, []);

    const steps = [
        t('registration-page.enter-code'),
        t('e-mail'),
        t('registration-page.agreements-and-regulations'),
        t('registration-page.create-password'),
        t('registration-page.confirmation'),
    ];

    const getStepContent = (step: number) => {
        if (step === 0) {
            return (
                <RegistrationCode
                    handleChange={handleChange}
                    handleNext={handleNext}
                    code={code}
                    classForm={classes.formItem}
                    classButton={classes.buttonWrapper}
                    classNextBtn={classes.nextButton}
                    // TODO: code needs to be validated
                    error={false}
                />
            );
        }

        if (step === 1) {
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
                    // TODO: email needs to be validated
                    error={false}
                />
            );
        }

        if (step === 2) {
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
                    agreements={agreements}
                    setAgreements={setAgreements}
                />
            );
        }

        if (step === 3) {
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
                    skip={setSkip}
                    loading={loading}
                />
            );
        }

        if (step === 4) {
            return (
                <>
                    <Box mb={6} />
                    <RegistrationFeedback
                        classLink={classes.goToHomepageLink}
                        classHeader={clsx({ [classes.loginHeader]: true, confirmation: activeStep === 3 })}
                        classWrapper={classes.confirmWrapper}
                    />
                </>
            );
        }

        return null;
    };

    const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        setLoading(() => true);
        if (!passwordStrengthTest(password)) {
            openAlertDialog({
                type: 'error',
                description: t('registration-page.password-not-strong'),
            });
            setLoading(() => false);
        } else if (password !== passwordConfirm) {
            openAlertDialog({
                type: 'error',
                description: t('registration-page.password-mismatch'),
            });
            setLoading(() => false);
        } else {
            load(
                createUser({
                    mail: email,
                    password,
                    keyCode: code,
                    agreements: agreements
                        .filter((agreement) => !!agreement._id && agreement.isSigned)
                        .map((item) => item._id),
                }),
            )
                .then(() => {
                    setLoading(() => false);
                    handleNext();
                })
                .catch((err) => {
                    // TODO: re-modify this!
                    setLoading(() => false);
                    if (skip) {
                        setSkip(() => false);
                        handleNext();
                    } else {
                        console.log(err.message);
                        openAlertDialog({
                            type: 'error',
                            title: t('registration-page.register-failure'),
                            description: t('registration-page.register-failure-description'),
                        });
                    }
                });
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { id, value } = event.target;
        setForm((prevForm) => ({ ...prevForm, [id]: value }));
    };

    return (
        <div className={classes.container}>
            <div className={classes.topHeader}>
                <LanguageSelector />
            </div>
            <Typography variant="h3" className={classes.header}>
                {t('registration-page.register-header')}
            </Typography>
            <Box mb={isDesktop ? 3 : 2} />
            {activeStep === 0 && (
                <>
                    <Typography className={classes.subHeader}>{t('login-wrapper.subheading')}</Typography>
                    <Box mb={isDesktop ? 2.5 : 2} />
                </>
            )}
            <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
                <Stepper
                    activeStep={activeStep}
                    orientation="vertical"
                    className={classes.stepper}
                    connector={
                        isDesktop ? (
                            <StepConnector
                                classes={{
                                    completed: classes.stepConnectorCompleted,
                                    active: classes.stepConnectorCompleted,
                                }}
                            />
                        ) : (
                            <StepConnector
                                classes={{
                                    root: classes.divider,
                                    completed: classes.dividerCompleted,
                                    active: classes.dividerCompleted,
                                }}
                            />
                        )
                    }
                >
                    {steps.map((step, idx) => (
                        <Step key={step} style={{ border: 'none' }}>
                            <StepLabel>
                                <Typography variant="body2">{step}</Typography>
                            </StepLabel>
                            <StepContent className={classes.stepperContent}>
                                {idx !== 4 ? getStepContent(idx) : null}
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </form>
            {activeStep === 4 && getStepContent(activeStep)}
            <div className={classes.footer}>
                <ButtonSecondary href="/login" innerText={t('registration-page.go-to-loginpage')} />
                <Box mb={3} />
            </div>
        </div>
    );
};
