import React, { useState, ChangeEvent, useEffect } from 'react';
import { Typography, makeStyles, createStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { NewsletterProgressBar } from './NewsletterProgressBar';
import { ProgressBarStates } from './types';
import { NewsletterRecipent } from './NewsletterRecipient';
import { NewsletterContent } from './NewsletterContent';
import { PageTitle } from '../../components/PageTitle/PageTitle';
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
        if (recipients.value.length > 0) {
            setProgressBarState({ firstStep: ProgressBarStates.Done, secondStep: ProgressBarStates.Ready });
        }
        if (recipients.value.length === 0 && !type.value && !topic.value && !message.value) {
            setProgressBarState({ firstStep: ProgressBarStates.Ready, secondStep: ProgressBarStates.Inactive });
        }
        if (recipients.value.length === 0 && (type.value || topic.value || message.value)) {
            setProgressBarState(prevSidebarState => ({ ...prevSidebarState, firstStep: ProgressBarStates.Error }));
        }
        if ((!type && (topic || message.value)) || ((!type.value || !topic.value) && message.value)) {
            setProgressBarState(prevSidebarState => ({
                ...prevSidebarState,
                secondStep: ProgressBarStates.Error,
            }));
        }
        if (recipients.value.length === 0 && !type.value && !topic.value && message.value === '<p><br></p>') {
            setProgressBarState({ firstStep: ProgressBarStates.Ready, secondStep: ProgressBarStates.Inactive });
        }
        if (
            recipients.value.length > 0 &&
            type.value &&
            topic.value &&
            message.value &&
            message.value !== '<p><br></p>'
        ) {
            setProgressBarState({ firstStep: ProgressBarStates.Done, secondStep: ProgressBarStates.Done });
        }
    }, [recipients, type, topic, message]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setFields(prevFields => ({
            ...prevFields,
            [name]: {
                value,
                error: false,
            },
        }));
        if (!value) {
            setFields(prevFields => ({
                ...prevFields,
                [name]: {
                    value,
                    error: true,
                },
            }));
        }
    };

    const handleTypeDelete = (): void => {
        setFields(prevFields => ({
            ...prevFields,
            type: {
                value: '',
                error: true,
            },
        }));
    };

    const selectRecipients = (filteredRecipients: string[]): void => {
        setFields(prevFields => ({
            ...prevFields,
            recipients: {
                value: filteredRecipients,
                error: false,
            },
        }));
    };

    const handleSubmit = async () => {
        // todo
    };

    return (
        <div className={classes.container}>
            <PageTitle text={t('newsletter.header')} />
            <Typography variant="h2" className={classes.subHeader}>
                {t('newsletter.subHeader')}
            </Typography>
            <div className={classes.formContainer}>
                <NewsletterProgressBar progressBarState={progressBarState} />
                <div className={classes.inputContainer}>
                    <NewsletterRecipent
                        generalType={generalType}
                        specificType={specificType}
                        recipients={recipients}
                        handleChange={handleChange}
                        selectRecipients={selectRecipients}
                        setFields={setFields}
                    />
                    <NewsletterContent
                        handleTypeDelete={handleTypeDelete}
                        handleChange={handleChange}
                        type={type}
                        topic={topic}
                        recipients={recipients}
                        message={message}
                        setFields={setFields}
                    />
                </div>
            </div>
            <div className={classes.formButtonWrapper}>
                <ButtonSecondary
                    variant="contained"
                    disabled={
                        recipients.value.length === 0 ||
                        !type.value ||
                        !topic.value ||
                        !message.value ||
                        message.value === '<p><br></p>'
                    }
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
            marginBottom: 40,
        },
        formContainer: {
            display: 'flex',
            width: '100%',
        },
        inputContainer: {
            width: '100%',
        },
        formButtonWrapper: {
            display: 'flex',
            justifyContent: 'flex-end',
        },
        formButton: {
            padding: '8px 22px',
        },
    }),
);
