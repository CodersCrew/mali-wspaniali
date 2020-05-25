import React, { useState, ChangeEvent, useEffect } from 'react';
import { Typography, Button, makeStyles, createStyles, ThemeProvider } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useAuthorization } from '../../hooks/useAuthorization';
import { createNewsletter } from '../../queries/newsletterQueries';
import { openAlertDialog } from '../../components/AlertDialog';
import { NewsletterSidebar } from './NewsletterSidebar';
import { SidebarElementState } from './types';
import { NewsletterRecipent } from './NewsletterRecipient';
import { NewsletterContent } from './NewsletterContent';
import { openDialog } from '../../utils/openDialog';
import { NewsletterSentModal } from './NewsletterSentModal';
import { theme } from '../../theme';
import { secondaryColor, white } from '../../colors';

const initialState = {
    type: '',
    topic: '',
    recipients: [] as string[],
};

export const NewsletterPage = () => {
    useAuthorization(true, '/', ['admin']);
    const classes = useStyles();
    const { t } = useTranslation();
    const [fields, setFields] = useState(initialState);
    const [message, setMessage] = useState('');
    const { type, topic, recipients } = fields;
    const [sidebarState, setSidebarState] = useState({
        topElement: SidebarElementState.Ready,
        bottomElement: SidebarElementState.Inactive,
    });

    useEffect(() => {
        if (fields.recipients.length > 0) {
            setSidebarState({ topElement: SidebarElementState.Done, bottomElement: SidebarElementState.Ready });
        }
        if (fields.recipients.length === 0 && !fields.type && !fields.topic && !message) {
            setSidebarState({ topElement: SidebarElementState.Ready, bottomElement: SidebarElementState.Inactive });
        }
        if (fields.recipients.length === 0 && (fields.type || fields.topic || message)) {
            setSidebarState(prevSidebarState => ({ ...prevSidebarState, topElement: SidebarElementState.Error }));
        }
        if ((!fields.type && (fields.topic || message)) || ((!fields.type || !fields.topic) && message)) {
            setSidebarState(prevSidebarState => ({
                ...prevSidebarState,
                bottomElement: SidebarElementState.Error,
            }));
        }
    }, [fields, message]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setFields(prevFields => ({
            ...prevFields,
            [name]: value,
        }));
    };

    const handleTypeDelete = (): void => {
        setFields(prevFields => ({
            ...prevFields,
            type: '',
        }));
    };

    const selectRecipients = (filteredRecipients: string[]): void => {
        setFields(prevFields => ({
            ...prevFields,
            recipients: filteredRecipients,
        }));
    };

    const handleSubmit = async () => {
        const response = await createNewsletter({ type, topic, recipients, message });
        if (response.error) {
            return openAlertDialog({
                type: 'error',
                description: t('newsletter.sending-error'),
            });
        }
        return openDialog(NewsletterSentModal, null);
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.container}>
                <Typography variant="h1" className={classes.header}>
                    {t('newsletter.header')}
                </Typography>
                <Typography variant="h2" className={classes.subHeader}>
                    {t('newsletter.subHeader')}
                </Typography>
                <div className={classes.formContainer}>
                    <NewsletterSidebar sidebarState={sidebarState} />
                    <div className={classes.inputContainer}>
                        <NewsletterRecipent
                            handleChange={handleChange}
                            recipients={recipients}
                            selectRecipients={selectRecipients}
                        />
                        <NewsletterContent
                            handleTypeDelete={handleTypeDelete}
                            handleChange={handleChange}
                            fields={fields}
                            message={message}
                            setMessage={setMessage}
                        />
                    </div>
                </div>
                <div className={classes.formButtonWrapper}>
                    <Button
                        disabled={fields.recipients.length === 0 || !fields.type || !fields.topic || !message}
                        className={classes.formButton}
                        onClick={handleSubmit}
                        classes={{ disabled: classes.formButtonDisabled }}
                    >
                        {t('newsletter.send')}
                    </Button>
                </div>
            </div>
        </ThemeProvider>
    );
};

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            padding: '0 150px 54px 60px',
            fontFamily: 'Montserrat, sans-serif',
            [theme.breakpoints.down('sm')]: {
                padding: '0 10px',
            },
        },
        header: {
            fontSize: 36,
            marginBottom: 20,
            textTransform: 'uppercase',
            marginTop: -30,
            lineHeight: '44px',
            fontWeight: 'bold',

            [theme.breakpoints.down('sm')]: {
                marginTop: 25,
                fontSize: 21,
                lineHeight: '26px',
            },
        },
        subHeader: {
            fontSize: 21,
            marginBottom: 40,
            lineHeight: '21px',
            fontWeight: 500,
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
            backgroundColor: secondaryColor,
            fontSize: 14,
            color: white,
            fontWeight: 'bold',
            padding: '8px 22px',
            lineHeight: 1.2,
            boxShadow: '1px 1px 4px 0 rgba(0, 0, 0, 0.6)',
            '&:hover': {
                color: secondaryColor,
            },
        },
        formButtonDisabled: {
            backgroundColor: 'rgba(0, 0, 0, 0.23)',
            color: 'rgba(0, 0, 0, 0.26)',
        },
    }),
);
