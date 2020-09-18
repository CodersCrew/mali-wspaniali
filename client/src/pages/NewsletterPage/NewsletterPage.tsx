import React, { useEffect } from 'react';
import clsx from 'clsx';
import { Typography, makeStyles, createStyles, Theme, Stepper, Step, StepLabel, StepContent } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { NewsletterFormValues } from './types';
import { NewsletterRecipent } from './NewsletterRecipient';
import { NewsletterContent } from './NewsletterContent';
import { ButtonSecondary } from '../../components/Button';
import { activePage } from '../../apollo_client';
import {
    isSubmitButtonDisabled,
    isFirstStepCompleted,
    isFirstStepError,
    isSecondStepError,
    isSecondStepCompleted,
    setSecondStepLabel,
    areSpecificRecipientsRequired,
    validate,
} from './utils';

export const NewsletterPage = () => {
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
        onSubmit: values => {
            console.log(values);
        },
    });

    const { generalRecipientType, specificRecipientType, recipients, type, topic, message } = formik.values;
    const { errors, touched, handleSubmit, handleChange, handleBlur } = formik;

    useEffect(() => {
        activePage(['admin-menu.newsletter']);
    }, []);

    const firstStepCompleted = isFirstStepCompleted(errors);

    const secondStepCompleted = isSecondStepCompleted(errors);

    const firstStepError = isFirstStepError(touched, errors);

    const secondStepError = isSecondStepError(touched, errors);

    return (
        <div className={classes.container}>
            <Typography variant="h3" className={classes.subHeader}>
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
                                handleChange={handleChange}
                                handleBlur={handleBlur}
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
                                handleChange={handleChange}
                                handleBlur={handleBlur}
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
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(3),
            [theme.breakpoints.down('sm')]: {
                padding: theme.spacing(0, 1),
            },
        },
        subHeader: {
            margin: theme.spacing(3, 0, 1),
            fontSize: theme.typography.h3.fontSize,
            lineHeight: theme.typography.h3.lineHeight,
            fontWeight: theme.typography.h3.fontWeight,
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
