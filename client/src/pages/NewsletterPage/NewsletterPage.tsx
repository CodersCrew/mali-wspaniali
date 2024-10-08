import { useEffect } from 'react';
import clsx from 'clsx';
import {
    Typography,
    makeStyles,
    createStyles,
    Theme,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    StepConnector,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useFormik, FormikErrors, FormikTouched } from 'formik';
import { useHistory } from 'react-router-dom';

import { NewsletterFormValues, SpecificRecipient } from './types';
import { NewsletterRecipent } from './NewsletterRecipient';
import { NewsletterContent } from './NewsletterContent';
import { ButtonSecondary } from '../../components/Button';
import { activePage } from '../../apollo_client';
import { useCreateNewsletter } from '../../operations/mutations/Newsletter/createNewsletter';
import { openSnackbar } from '../../components/Snackbar/openSnackbar';

const parser = new DOMParser();

export default function NewsletterPage() {
    const classes = useStyles();
    const { t } = useTranslation();
    const { createNewsletter, createNewsletterPending } = useCreateNewsletter();
    const history = useHistory();
    const isSubmitButtonDisabled = (errors: FormikErrors<NewsletterFormValues>) =>
        Object.keys(errors).length !== 0 || createNewsletterPending;

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
            specificRecipientType: t('newsletter.specific-recipient-helper-text'),
            recipients: t('newsletter.recipient-helper-text'),
            type: t('newsletter.type-helper-text'),
            topic: t('newsletter.topic-helper-text'),
            message: t('newsletter.message-helper-text'),
        },
        validate,
        onSubmit: (values) => {
            createNewsletter({
                message: values.message,
                recipients: values.recipients,
                title: values.topic,
                type: `${values.generalRecipientType} ${values.specificRecipientType} ${values.type}`,
            })
                .then(() => {
                    openSnackbar({
                        text: t('newsletter.created'),
                    }).then(() => {
                        history.push('/admin/archive');
                    });
                })
                .catch(() => {
                    openSnackbar({
                        text: t('newsletter.created-error'),
                        severity: 'error',
                    });
                });
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
                        <StepConnector
                            classes={{
                                root: classes.rootConnecter,
                                lineVertical: classes.lineVertical,
                            }}
                        />
                    </Step>
                    <Step
                        expanded
                        className={clsx({
                            [classes.step]: true,
                        })}
                        active={firstStepCompleted}
                        completed={secondStepCompleted}
                    >
                        <StepLabel className={classes.stepLabel} error={secondStepError}>
                            {t(setSecondStepLabel(firstStepCompleted, secondStepCompleted))}
                        </StepLabel>
                        <Step expanded className={classes.step}>
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

const isFirstStepCompleted = (errors: FormikErrors<NewsletterFormValues>) =>
    !errors.generalRecipientType && !errors.specificRecipientType && !errors.recipients;

const isSecondStepCompleted = (errors: FormikErrors<NewsletterFormValues>) =>
    !errors.type && !errors.topic && !errors.message;

const isFirstStepError = (touched: FormikTouched<NewsletterFormValues>, errors: FormikErrors<NewsletterFormValues>) =>
    (!!touched.generalRecipientType && !!errors.generalRecipientType) ||
    (!!touched.specificRecipientType && !!errors.specificRecipientType) ||
    (!!touched.recipients && !!errors.recipients);

const isSecondStepError = (touched: FormikTouched<NewsletterFormValues>, errors: FormikErrors<NewsletterFormValues>) =>
    (!!touched.type && !!errors.type) || (!!touched.topic && !!errors.topic) || (!!touched.message && !!errors.message);

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

    const { specificRecipientType, recipients, type, topic, message } = values;

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

    if (isEmptyMessage(message)) {
        errors.message = 'newsletter.message-helper-text';
    }

    return errors;
};

// Given message is a stringify DOM element.
function isEmptyMessage(message: string) {
    const parsedMessage = parser.parseFromString(message, 'text/html');

    return parsedMessage.documentElement.textContent?.length === 0;
}

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
        },
        rootConnecter: {
            width: 1,
            top: '70px',
            left: '46.5px',
            margin: 0,
            height: '70%',
        },
        lineVertical: {
            height: '100%',
        },
    }),
);
