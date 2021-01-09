import React, { useEffect } from 'react';
import clsx from 'clsx';
import { Typography, makeStyles, createStyles, Theme, Stepper, Step, StepLabel, StepContent } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useFormik, FormikErrors, FormikTouched } from 'formik';
import { NewsletterFormValues, SpecificRecipient } from './types';
import { NewsletterRecipent } from './NewsletterRecipient';
import { NewsletterContent } from './NewsletterContent';
import { ButtonSecondary } from '../../components/Button';
import { activePage } from '../../apollo_client';

export default function NewsletterPage() {
    const classes = useStyles();
    const { t } = useTranslation();

    const formik = useFormik<NewsletterFormValues>({
        initialValues: {
            generalRecipientType: '',
            specificRecipientType: '',
            recipients: [],
            type: '',
            topic: '',
            message: '',
        },
        initialErrors: {
            generalRecipientType: t('newsletter.general-recipient-helper-text'),
            specificRecipientType: t('newsletter.specific-recipient-helper-text'),
            recipients: t('newsletter.recipient-helper-text'),
            type: t('newsletter.type-helper-text'),
            topic: t('newsletter.topic-helper-text'),
        },
        validate,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const { generalRecipientType, specificRecipientType, recipients, type, topic, message } = formik.values;
    const { errors, touched, handleSubmit, handleBlur, setFieldValue } = formik;

    useEffect(() => {
        activePage(['admin-menu.newsletter.title', 'admin-menu.newsletter.new-message']);
    }, []);

    const firstStepCompleted = isFirstStepCompleted(errors);

    const secondStepCompleted = isSecondStepCompleted(errors);

    const firstStepError = isFirstStepError(touched, errors);

    const secondStepError = isSecondStepError(touched, errors);

    return (
        <div className={classes.container}>
            <Typography variant="h3" className={classes.description}>
                {t('newsletter.subHeader')}
            </Typography>
            <form onSubmit={handleSubmit} noValidate>
                <Stepper orientation="vertical" className={classes.stepper} alternativeLabel>
                    <Step expanded className={classes.step} completed={firstStepCompleted}>
                        <StepLabel className={classes.stepLabel} error={firstStepError}>
                            {firstStepCompleted ? t('newsletter.sidebar.done') : t('newsletter.sidebar.fill')}
                        </StepLabel>
                        <StepContent className={classes.stepContent}>
                            <NewsletterRecipent
                                generalRecipientType={generalRecipientType}
                                specificRecipientType={specificRecipientType}
                                recipients={recipients}
                                onChange={(name, value) => setFieldValue(name, value)}
                                onBlur={handleBlur}
                                errors={errors}
                                touched={touched}
                            />
                        </StepContent>
                    </Step>
                    <Step
                        expanded
                        className={clsx({
                            [classes.step]: true,
                            [classes.stepLong]: areSpecificRecipientsRequired(specificRecipientType),
                        })}
                        active={firstStepCompleted}
                        completed={secondStepCompleted}
                    >
                        <StepLabel className={classes.stepLabel} error={secondStepError}>
                            {t(setSecondStepLabel(firstStepCompleted, secondStepCompleted))}
                        </StepLabel>
                        <StepContent className={classes.stepContent}>
                            <NewsletterContent
                                onChange={(name, value) => setFieldValue(name, value)}
                                onBlur={handleBlur}
                                type={type}
                                topic={topic}
                                message={message}
                                errors={errors}
                                touched={touched}
                            />
                        </StepContent>
                    </Step>
                </Stepper>
                <div className={classes.formButtonWrapper}>
                    <ButtonSecondary
                        variant="contained"
                        type="submit"
                        disabled={isSubmitButtonDisabled(errors)}
                        className={classes.formButton}
                        innerText={t('newsletter.send')}
                    />
                </div>
            </form>
        </div>
    );
}

const areSpecificRecipientsRequired = (value: SpecificRecipient | '') => value === 'KINDERGARTEN' || value === 'SINGLE';

const isSubmitButtonDisabled = (errors: FormikErrors<NewsletterFormValues>) => Object.keys(errors).length !== 0;

const isFirstStepCompleted = (errors: FormikErrors<NewsletterFormValues>) =>
    !errors.generalRecipientType && !errors.specificRecipientType && !errors.recipients;

const isSecondStepCompleted = (errors: FormikErrors<NewsletterFormValues>) => !errors.type && !errors.topic;

const isFirstStepError = (touched: FormikTouched<NewsletterFormValues>, errors: FormikErrors<NewsletterFormValues>) =>
    (!!touched.generalRecipientType && !!errors.generalRecipientType) ||
    (!!touched.specificRecipientType && !!errors.specificRecipientType) ||
    (!!touched.recipients && !!errors.recipients);

const isSecondStepError = (touched: FormikTouched<NewsletterFormValues>, errors: FormikErrors<NewsletterFormValues>) =>
    (!!touched.type && !!errors.type) || (!!touched.topic && !!errors.topic);

const setSecondStepLabel = (firstStepCompleted: boolean, secondStepCompleted: boolean) => {
    if (!firstStepCompleted) {
        return 'newsletter.sidebar.newsletter-content';
    }
    if (secondStepCompleted) {
        return 'newsletter.sidebar.done';
    }

    return 'newsletter.sidebar.fill';
};

const validate = (values: NewsletterFormValues) => {
    const errors: FormikErrors<NewsletterFormValues> = {};

    const { generalRecipientType, specificRecipientType, recipients, type, topic } = values;

    if (!generalRecipientType) {
        errors.generalRecipientType = 'newsletter.general-recipient-helper-text';
    }

    if (!specificRecipientType) {
        errors.specificRecipientType = 'newsletter.specific-recipient-helper-text';
    }

    if (areSpecificRecipientsRequired(specificRecipientType) && recipients.length === 0) {
        errors.recipients = 'newsletter.recipient-helper-text';
    }

    if (!type) {
        errors.type = 'newsletter.type-helper-text';
    }

    if (!topic) {
        errors.topic = 'newsletter.topic-helper-text';
    }

    // TODO:
    // validate message field
    return errors;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(3),
            [theme.breakpoints.down('sm')]: {
                padding: theme.spacing(0, 1),
            },
        },
        description: {
            margin: theme.spacing(3, 0, 1),
        },
        formContainer: {
            display: 'flex',
            width: '100%',
        },
        formButtonWrapper: {
            display: 'flex',
            justifyContent: 'flex-end',
        },
        formButton: {
            padding: theme.spacing(1, 3),
            marginTop: theme.spacing(3),
        },
        stepper: {
            background: 0,
            padding: 0,
        },
        stepLabel: {
            width: '94px',
            flexShrink: 0,
        },
        stepContent: {
            borderLeft: 0,
            padding: 0,
            width: '100%',
            marginTop: 0,
        },
        step: {
            display: 'flex',
            width: '100%',
            marginTop: theme.spacing(3),

            '& .MuiStepConnector-alternativeLabel': {
                top: '-177px',
                left: '46.5px',
                height: '200px',
                width: '1px',
                padding: 0,
                margin: 0,

                '& .MuiStepConnector-lineVertical': {
                    height: '167px',
                },
            },
        },

        stepLong: {
            '& .MuiStepConnector-alternativeLabel': {
                top: '-249px',
                '& .MuiStepConnector-lineVertical': {
                    height: '239px',
                },
            },
        },
    }),
);
