import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, StepContent, Typography, Box } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { createUser } from '../../../queries/userQueries';
import { getAgreements } from '../../../graphql/agreementRepository';
import { load } from '../../../utils/load';
import { openAlertDialog } from '../../../components/AlertDialog';
import { passwordStrengthTest } from '../passwordStrengthTest';
import { ButtonSecondary } from '../../../components/Button';
import { Agreement } from '../../../graphql/types';

import { RegistrationAgreement } from './RegistrationAgreement';
import { RegistrationCode } from './RegistrationCode';
import { RegistrationEmail } from './RegistrationEmail';
import { RegistrationFeedback } from './RegistrationFeedback';
import { RegistrationPassword } from './RegistrationPassword';
import { RegisterForm } from './types';
import { useStyles } from './styles';
import { LanguageSelector } from './LanguageSelector';

interface AgreementExtended extends Agreement {
    extraContent?: string;
    isRequired?: boolean;
    checked?: boolean;
}

const initialState: RegisterForm = {
    code: '',
    email: '',
    password: '',
    passwordConfirm: '',
};

export const RegistrationForm = () => {
    const [form, setForm] = useState(initialState);
    // TODO: turn back to 0
    const [activeStep, setActiveStep] = useState(0);
    const [agreements, setAgreements] = useState<AgreementExtended[]>([]);
    const { code, email, password, passwordConfirm } = form;
    const classes = useStyles();
    const { t } = useTranslation();

    useEffect(() => {
        getAgreements()
            .then(({ data }) => {
                // TODO: is this exclamation mark necessary? ESlint doesn't like it
                // (@typescript-eslint/no-non-null-assertion): setAgreements(data!.agreements);
                setAgreements(data.agreements);
                // TODO: remove this mock!
                setAgreements([
                    {
                        _id: '0',
                        date: '2021-01-21',
                        isSigned: false,
                        text: 'Zaznacz wszystkie zgody',
                    },
                    {
                        _id: '1',
                        date: '2021-01-21',
                        isSigned: false,
                        text:
                            'Oświadczam, że zapoznałam/em się z treścią oraz akceptuję postanowienia Regulaminu, ' +
                            'Polityki prywatności',
                        isRequired: true,
                    },
                    {
                        _id: '2',
                        date: '2021-01-21',
                        isSigned: false,
                        text:
                            'Wyrażam chęć udziału mojego dziecka w zajęciach ogólnorozwojowych z elementami karate ' +
                            'w ramach programu Mali Wspaniali.',
                        isRequired: true,
                    },
                    {
                        _id: '3',
                        date: '2021-01-21',
                        isSigned: false,
                        text:
                            'Wyrażam zgodę na otrzymywanie informacji marketingowych na podany adres e-mail. (dzięki ' +
                            'niej od czasu do czasu będziemy mogli pochwalić się naszymi sukcesami).',
                        extraContent:
                            'Wyrażam zgodę na przetwarzanie mojego adresu e-mail przez Fundację Mali Wspaniali, ' +
                            'z siedzibą we Wrocławiu przy ul. Ślężnej 2-24, 53-302 Wrocław w celach marketingowych ' +
                            'oraz handlowych. Dzięki tej zgodzie będziemy mogli wysyłać Pani/Panu e-mail z bieżącymi ' +
                            'informacjami dotyczącymi programu Mali Wspaniali. Od czasu do czasu pochwalimy się ' +
                            'naszymi sukcesami.',
                    },
                    {
                        _id: '4',
                        date: '2021-01-21',
                        isSigned: false,
                        text:
                            'Wyrażam zgodę na nieodpłatne przetwarzanie wizerunku mojego dziecka przez Fundację Mali ' +
                            'Wspaniali. (Dzięki niej będzie miał/a Pani/Pan okazję zobaczyć swoją pociechę na ' +
                            'zdjęciach, filmach z zajęć publikowanych przez fundację).',
                        extraContent:
                            'Wyrażam zgodę na nieodpłatne przetwarzanie  wizerunku mojego dziecka przez Fundację ' +
                            'Mali Wspaniali,  z siedzibą we Wrocławiu przy ul. Ślężnej 2-24, 53-302 Wrocław w ramach ' +
                            'prowadzonej działalności.\n' +
                            'Dzięki tej zgodzie, będziemy mogli pochwalić się odnoszonymi  sukcesami oraz promować ' +
                            'naszą Fundację poprzez publikowanie indywidualnego wizerunku dziecka w postaci zdjęć ' +
                            'oraz filmów: w fotorelacjach w mediach (prasie i telewizji), na portalach i stronach ' +
                            'internetowych administrowanych przez Fundację. Ta zgoda da Panu/Pani możliwosć do ' +
                            'zobaczenia swojej pociechy na materiałach z zajęć publikowanyh przez Fundację. Zgoda ' +
                            'nie dotyczy przetwarzania wizerunku  dziecka/ci na zdjęciach grupowych. Mamy prawo ' +
                            'przetwarzać wizerunek dziecka/ci kiedy stanowi szczegół całości fotografowanej/' +
                            'filmowanej grupy.  ',
                    },
                ]);
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
                />
            );
        }

        if (step === 4) {
            return (
                <RegistrationFeedback
                    classLink={classes.goToHomepageLink}
                    classHeader={clsx({ [classes.loginHeader]: true, confirmation: activeStep === 3 })}
                    classWrapper={classes.confirmWrapper}
                />
            );
        }

        return null;
    };

    const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

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
                .catch((err) => {
                    openAlertDialog({
                        type: 'error',
                        description: err.message,
                    });
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
            <Box mb={3} />
            <Typography className={classes.header}>{t('login-wrapper.subheading')}</Typography> <Box mb={2.5} />
            <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
                <Stepper activeStep={activeStep} orientation="vertical" className={classes.stepper}>
                    {steps.map((step, idx) => (
                        <Step key={step} style={{ border: 'none' }}>
                            <StepLabel>
                                <Typography variant="body2">{step}</Typography>
                            </StepLabel>
                            <StepContent>{getStepContent(idx)}</StepContent>
                        </Step>
                    ))}
                </Stepper>{' '}
            </form>
            <div className={classes.footer}>
                <ButtonSecondary href="/login" innerText={t('registration-page.go-to-loginpage')} />
                <Box mb={3} />
            </div>
        </div>
    );
};
