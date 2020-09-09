import React, { useState, ChangeEvent, useEffect } from 'react';
import { Typography, makeStyles, createStyles, Theme, Stepper, Step, StepLabel, StepContent } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
// import { NewsletterProgressBar } from './NewsletterProgressBar';
import { ProgressBarStates } from './types';
import { NewsletterRecipent } from './NewsletterRecipient';
import { NewsletterContent } from './NewsletterContent';
import { setProgress } from './utils';
import { ButtonSecondary } from '../../components/Button';
import { activePage } from '../../apollo_client';

const initialState = {
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
        value: [] as string[],
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
    const [progressBarState, setProgressBarState] = useState({
        firstStep: ProgressBarStates.Ready,
        secondStep: ProgressBarStates.Inactive,
    });

    useEffect(() => {
        activePage(['admin-menu.newsletter']);
        console.log(progressBarState);
    }, []);

    useEffect(() => {
        setProgress(specificType, recipients, type, topic, message, setProgressBarState);
    }, [specificType, recipients, type, topic, message]);

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

    const isSubmitBtnDisabled =
        recipients.value.length === 0 ||
        !type.value ||
        !topic.value ||
        !message.value ||
        message.value === '<p><br></p>';

    return (
        <div className={classes.container}>
            <Typography variant="h3" className={classes.subHeader}>
                {t('newsletter.subHeader')}
            </Typography>
            <Stepper orientation="vertical" className={classes.stepper} alternativeLabel>
                <Step expanded className={classes.step}>
                    <StepLabel className={classes.stepLabel}>krok 1</StepLabel>
                    <StepContent className={classes.stepContent}>
                        <NewsletterRecipent
                            generalType={generalType}
                            specificType={specificType}
                            recipients={recipients}
                            handleChange={handleChange}
                        />
                    </StepContent>
                </Step>
                <Step expanded className={classes.step}>
                    <StepLabel className={classes.stepLabel}>krok 2</StepLabel>
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
                    disabled={isSubmitBtnDisabled}
                    className={classes.formButton}
                    onClick={handleSubmit}
                    innerText={t('newsletter.send')}
                />
            </div>
            {/* <div className={classes.formContainer}>
                <NewsletterProgressBar progressBarState={progressBarState} />
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <NewsletterRecipent
                            generalType={generalType}
                            specificType={specificType}
                            recipients={recipients}
                            handleChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <NewsletterContent
                            handleChange={handleChange}
                            type={type}
                            topic={topic}
                            specificType={specificType}
                            recipients={recipients}
                            message={message}
                            setFields={setFields}
                        />
                    </Grid>
                </Grid>
            </div>
            <div className={classes.formButtonWrapper}>
                <ButtonSecondary
                    variant="contained"
                    disabled={isSubmitBtnDisabled}
                    className={classes.formButton}
                    onClick={handleSubmit}
                    innerText={t('newsletter.send')}
                />
            </div> */}
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
            // flexGrow: 1,
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
    }),
);
