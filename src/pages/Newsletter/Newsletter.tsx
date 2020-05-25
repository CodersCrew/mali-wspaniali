import React, { useState, ChangeEvent, useEffect } from 'react';
import { Typography, Button, makeStyles, Grid, Theme, createStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
//import { useAuthorization } from '../../hooks/useAuthorization';
import { createNewsletter } from '../../queries/newsletterQueries';
import { openAlertDialog } from '../../components/AlertDialog';
import { Navbar } from '../../components/Navbar/Navbar';
import { NewsletterSidebar } from './NewsletterSidebar';
import { SidebarElementState } from './types';
import { NewsletterRecipent } from './NewsletterRecipient';
import { NewsletterContent } from './NewsletterContent';

const initialState = {
    type: '',
    topic: '',
    recipients: [] as string[],
};

export const NewsletterPage = () => {
    //useAuthorization(true, '/', ['admin']);
    const classes = useStyles();
    const { t } = useTranslation();
    const [fields, setFields] = useState(initialState);
    const [message, setMessage] = useState('');
    const { type, topic, recipients } = fields;
    const [sidebarState, setSidebarState] = useState([SidebarElementState.Ready, SidebarElementState.Inactive]);

    useEffect(() => {
        console.log(fields.recipients.length);
        if (fields.recipients.length >= 1) {
            setSidebarState([SidebarElementState.Done, SidebarElementState.Ready]);
        }
        if (fields.recipients.length === 0) {
            setSidebarState([SidebarElementState.Ready, SidebarElementState.Inactive]);
        }
    }, [fields]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setFields(prevFields => ({
            ...prevFields,
            [name]: value,
        }));
    };

    const filterRecipients = (filteredRecipients: string[]): void => {
        setFields(prevFields => ({
            ...prevFields,
            recipients: filteredRecipients,
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
                <Grid item xs={2}>
                    <NewsletterSidebar sidebarState={sidebarState} />
                </Grid>
                <Grid item xs={8}>
                    <NewsletterRecipent
                        handleChange={handleChange}
                        recipients={recipients}
                        filterRecipients={filterRecipients}
                    />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={2} />
                <Grid item xs={8}>
                    <NewsletterContent
                        handleChange={handleChange}
                        fields={fields}
                        message={message}
                        setMessage={setMessage}
                    />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={2} />

                <Grid item xs={8} className={classes.formButtonWrapper}>
                    <Button className={classes.formButton} onClick={handleSubmit}>
                        {t('newsletter.send')}
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

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
        formButtonWrapper: {
            display: 'flex',
            justifyContent: 'flex-end',
        },
        formButton: {
            backgroundColor: '#ff7149',
            fontSize: 14,
            color: '#ffffff',
            fontWeight: 'bold',
            padding: '8px 22px',
            lineHeight: 1.2,
            boxShadow: '1px 1px 4px 0 rgba(0, 0, 0, 0.6)',
            '&:hover':   {
              color: '#ff7149',
            }
        },
    }),
);
