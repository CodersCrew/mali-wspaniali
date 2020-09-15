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
    setSecondStepLabel,
    areSpecificRecipientsRequired,
} from './utils';

export const NewsletterPage = () => {
    const formik = useFormik<NewsletterFormValues>({
        initialValues: {
            generalRecipientType: '',
            specificRecipientType: '',
            recipients: [],
            type: '',
            topic: '',
            message: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const classes = useStyles();
    const { t } = useTranslation();
    const { generalRecipientType, specificRecipientType, recipients, type, topic, message } = formik.values;

    useEffect(() => {
        activePage(['admin-menu.newsletter']);
    }, []);

    const firstStepCompleted = isFirstStepCompleted(generalRecipientType, specificRecipientType, recipients);

    const secondStepCompleted = !!(type && topic && message);

    const firstStepError = isFirstStepError(formik.values);

    const secondStepError = isSecondStepError(type, topic, message);

    return (
        <div className={classes.container}>
            <Typography variant="h3" className={classes.subHeader}>
                {t('newsletter.subHeader')}
            </Typography>
            <form onSubmit={formik.handleSubmit}>
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
                                handleChange={formik.handleChange}
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
                                handleChange={formik.handleChange}
                                type={type}
                                topic={topic}
                                message={message}
                            />
                        </StepContent>
                    </Step>
                </Stepper>
                <div className={classes.formButtonWrapper}>
                    <ButtonSecondary
                        variant="contained"
                        type="submit"
                        disabled={isSubmitButtonDisabled(formik.values)}
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
                padding: '0 10px',
            },
        },
        subHeader: {
            margin: '24px 0 8px',
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
            padding: '8px 22px',
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
