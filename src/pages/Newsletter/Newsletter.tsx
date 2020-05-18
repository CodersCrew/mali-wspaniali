import React, { useState, ChangeEvent } from 'react';
import { Typography, Button, TextField, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useAuthorization } from '../../hooks/useAuthorization';
import { createNewsletter } from '../../queries/newsletterQueries';
import { openAlertDialog } from '../../components/AlertDialog';
import { WorkSpace } from './Workspace';

const initialState = {
    type: '',
    topic: '',
    recipients: [],
};

export const NewsletterPage = () => {
    useAuthorization(true, '/', ['admin']);
    const classes = useStyles();
    const { t } = useTranslation();
    const [fields, setFields] = useState(initialState);
    const [message, setMessage] = useState('');
    const { type, topic, recipients } = fields;

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { id, value } = event.target;
        setFields(prevFields => ({
            ...prevFields,
            [id]: value,
        }));
    };

    const handleSubmit = async () => {
        if (!type || !topic || !recipients) {
            return openAlertDialog({
                type: 'error',
                description: t('newsletter.fill-required-fields'),
            });
        }

        if (!message) {
            return openAlertDialog({
                type: 'error',
                description: t('newsletter.empty-message'),
            });
        }

        const response = await createNewsletter({ type, topic, recipients, message });
        if (response.error) {
            return openAlertDialog({
                type: 'error',
                description: t('newsletter.sending-error'),
            });
        }
        return openAlertDialog({
            type: 'success',
            description: t('newsletter.sending-success'),
        });
    };

    return (
        <div className={classes.container}>
            <Typography variant="h2" gutterBottom className={classes.h2}>
                {t('newsletter.header')}
            </Typography>
            <div className={classes.inputFields}>
                <TextField
                    required
                    onChange={handleChange}
                    value={type}
                    id="type"
                    label={t('newsletter.type')}
                    fullWidth
                />
                <TextField
                    required
                    onChange={handleChange}
                    value={topic}
                    id="topic"
                    label={t('newsletter.topic')}
                    fullWidth
                />
                <TextField
                    required
                    onChange={handleChange}
                    value={recipients}
                    type="email"
                    id="recipients"
                    label={t('newsletter.recipients')}
                    fullWidth
                />
            </div>
            <WorkSpace message={message} setMessage={setMessage} />
            <Button onClick={handleSubmit}>{t('newsletter.send')}</Button>
        </div>
    );
};

const useStyles = makeStyles({
    h2: {
        marginTop: '100px',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    inputFields: {
        marginBottom: '40px',
    },
});
