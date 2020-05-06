import React, { useState, ChangeEvent } from 'react';
import { Typography, Button, TextField, makeStyles, Grid, Theme, createStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
//import { useAuthorization } from '../../hooks/useAuthorization';
import { createNewsletter } from '../../queries/newsletterQueries';
import { openAlertDialog } from '../../components/AlertDialog';
import { Navbar } from '../../components/Navbar/Navbar';
import { NewsletterSidebar } from './NewsletterSidebar';
import { WorkSpace } from './Workspace';
import { SidebarElementStates } from './types';

const initialState = {
    type: '',
    topic: '',
    recipients: [],
};

export const NewsletterPage = () => {
    //useAuthorization(true, '/', ['admin']);
    const classes = useStyles();
    const { t } = useTranslation();
    const [fields, setFields] = useState(initialState);
    const [message, setMessage] = useState('');
    const { type, topic, recipients } = fields;
    const [active] = useState([SidebarElementStates.Done, SidebarElementStates.Ready]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { id, value } = event.target;
        setFields(prevFields => ({
            ...prevFields,
            [id]: value,
        }));
    };

    // eslint-disable-next-line consistent-return
    const handleSubmit = () => {
        if (!type || !topic || !recipients)
            return openAlertDialog({
                type: 'error',
                description: t('newsletter.fill-required-fields'),
            });
        if (!message)
            return openAlertDialog({
                type: 'error',
                description: t('newsletter.empty-message'),
            });

        createNewsletter({ type, topic, recipients, message }).then(response => {
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
        });
    };

    return (
        <Grid className={classes.container}>
            <Navbar />
            <Grid item xs={12}>
                <Typography variant="h1" gutterBottom className={classes.header}>
                    {t('newsletter.header')}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h2" gutterBottom className={classes.subHeader}>
                    {t('newsletter.subHeader')}
                </Typography>
            </Grid>
            <Grid container>
                <Grid item>
                    <NewsletterSidebar active={active} />
                </Grid>
                <Grid item>
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
                </Grid>
                <WorkSpace message={message} setMessage={setMessage} />
                <Button onClick={handleSubmit}>{t('newsletter.send')}</Button>
            </Grid>
        </Grid>
    );
};
/*
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
*/
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: '0 0 54px 60px',
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
    }),
);
