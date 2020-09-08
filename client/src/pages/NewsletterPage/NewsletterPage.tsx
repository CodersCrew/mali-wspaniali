import React, { useState, ChangeEvent, useEffect } from 'react';
import { Typography, makeStyles, createStyles, Theme, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { NewsletterProgressBar } from './NewsletterProgressBar';
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
            <div className={classes.formContainer}>
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
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: '0 90px 54px 0',
            [theme.breakpoints.down('sm')]: {
                padding: '0 10px',
            },
        },
        subHeader: {
            margin: '24px 0 32px',
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
    }),
);
