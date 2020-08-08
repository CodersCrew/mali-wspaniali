import React, { useState, ChangeEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, makeStyles, createStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useAuthorization } from '../../hooks/useAuthorization';
import { createNewsletter } from '../../queries/newsletterQueries';
import { openAlertDialog } from '../../components/AlertDialog';
import { NewsletterProgressBar } from './NewsletterProgressBar';
import { ProgressBarStates } from './types';
import { NewsletterRecipent } from './NewsletterRecipient';
import { NewsletterContent } from './NewsletterContent';
import { openDialog } from '../../utils/openDialog';
import { NewsletterSentModal } from './NewsletterSentModal';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { ButtonSecondary } from '../../components/Button';

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
    useAuthorization(true, '/', ['admin']);
    const classes = useStyles();
    const { t } = useTranslation();
    const history = useHistory();
    const [fields, setFields] = useState(initialState);
    const { type, topic, recipients, generalType, specificType, message } = fields;
    const [progressBarState, setProgressBarState] = useState({
        firstStep: ProgressBarStates.Ready,
        secondStep: ProgressBarStates.Inactive,
    });

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

    const goToAdminPage = () => {
        history.push('/admin');
    };

    const resetState = () => {
        setFields(initialState);
        setProgressBarState({
            firstStep: ProgressBarStates.Ready,
            secondStep: ProgressBarStates.Inactive,
        });
    };

    const handleSubmit = async () => {
        const response = await createNewsletter({
            type: type.value,
            topic: topic.value,
            recipients: recipients.value,
            message: message.value,
        });
        if (response.error) {
            return openAlertDialog({
                type: 'error',
                description: t('newsletter.sending-error'),
            });
        }

        return openDialog(NewsletterSentModal, { goToAdminPage, resetState });
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
