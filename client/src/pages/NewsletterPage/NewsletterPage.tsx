import React, { useState, ChangeEvent, useEffect } from 'react';
import clsx from 'clsx';
import { Typography, makeStyles, createStyles, Theme, Stepper, Step, StepLabel, StepContent } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { NewsletterState } from './types';
import { NewsletterRecipent } from './NewsletterRecipient';
import { NewsletterContent } from './NewsletterContent';
import { ButtonSecondary } from '../../components/Button';
import { activePage } from '../../apollo_client';
import {
    isSubmitBtnDisabled,
    isFirstStepCompleted,
    isFirstStepError,
    isSecondStepError,
    setSecondStepLabel,
    areSpecificRecipientsRequired,
} from './utils';

const initialState: NewsletterState = {
    type: {
        value: '',
        error: false,
    },
    topic: {
        value: '',
        error: false,
    },
    generalType: {
        value: '',
        error: false,
    },
    specificType: {
        value: '',
        error: false,
    },
    recipients: {
        value: [],
        error: false,
    },
    message: {
        value: '',
        error: false,
    },
};

export const NewsletterPage = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [fields, setFields] = useState(initialState);
    const { type, topic, recipients, generalType, specificType, message } = fields;

    useEffect(() => {
        activePage(['admin-menu.newsletter']);
    }, []);

    const handleChange = (e: ChangeEvent<{ name?: string | undefined; value: unknown }>): void => {
        const { name, value } = e.target;
        if (name) {
            setFields(prevFields => ({
                ...prevFields,
                [name]: {
                    value,
                    error: !value,
                },
            }));
        }
    };

    const handleSubmit = async () => {
        // TODO:
        console.log('submitted');
        console.log(fields);
    };

    const firstStepCompleted = isFirstStepCompleted(generalType.value, specificType.value, recipients.value);

    const secondStepCompleted = !!(type.value && topic.value && message.value);

    const firstStepError = isFirstStepError(fields);

    const secondStepError = isSecondStepError(type.value, topic.value, message.value);

    return (
        <div className={classes.container}>
            <Typography variant="h3" className={classes.subHeader}>
                {t('newsletter.subHeader')}
            </Typography>
            <Stepper orientation="vertical" className={classes.stepper} alternativeLabel>
                <Step expanded className={classes.step} completed={firstStepCompleted}>
                    <StepLabel className={classes.stepLabel} error={firstStepError}>
                        {firstStepCompleted ? t('newsletter.sidebar.done') : t('newsletter.sidebar.fill')}
                    </StepLabel>
                    <StepContent className={classes.stepContent}>
                        <NewsletterRecipent
                            generalType={generalType}
                            specificType={specificType}
                            recipients={recipients}
                            handleChange={handleChange}
                        />
                    </StepContent>
                </Step>
                <Step
                    expanded
                    className={clsx(
                        classes.step,
                        areSpecificRecipientsRequired(specificType.value) && classes.stepLong,
                    )}
                    active={firstStepCompleted}
                    completed={secondStepCompleted}
                >
                    <StepLabel className={classes.stepLabel} error={secondStepError}>
                        {t(setSecondStepLabel(firstStepCompleted, secondStepCompleted))}
                    </StepLabel>
                    <StepContent className={classes.stepContent}>
                        <NewsletterContent
                            handleChange={handleChange}
                            type={type}
                            topic={topic}
                            message={message}
                            setFields={setFields}
                        />
                    </StepContent>
                </Step>
            </Stepper>
            <div className={classes.formButtonWrapper}>
                <ButtonSecondary
                    variant="contained"
                    disabled={isSubmitBtnDisabled(fields)}
                    className={classes.formButton}
                    onClick={handleSubmit}
                    innerText={t('newsletter.send')}
                />
            </div>
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
