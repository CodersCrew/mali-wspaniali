import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, IconButton, Card, CardHeader, CardContent, Divider, Grid } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { WorkSpace } from './Workspace';
import { openDialog } from '../../utils/openDialog';
import { HelpModal } from './HelpModal';
import { NewsletterContentProps, SpecificRecipientInputValues } from './types';
import { newsletterTypes } from './data';
import { SingleSelect } from './SingleSelect';

export const NewsletterContent = ({
    handleChange,
    type,
    topic,
    specificType,
    recipients,
    message,
    setFields,
}: NewsletterContentProps) => {
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (recipients.value.length > 0 || specificType.value === SpecificRecipientInputValues.all) {
            setDisabled(false);
        }
    }, [recipients, specificType.value]);

    const { t } = useTranslation();

    const handleModalOpen = () => {
        openDialog(HelpModal, null);
    };

    return (
        <Card>
            <CardHeader
                title={t('newsletter.content-heading')}
                titleTypographyProps={{ variant: 'h4' }}
                action={
                    <IconButton aria-label="info" onClick={handleModalOpen} color="primary">
                        <InfoOutlinedIcon />
                    </IconButton>
                }
            />
            <Divider />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <SingleSelect
                            disabled={disabled}
                            stateData={type}
                            optionsValues={newsletterTypes}
                            handleChange={handleChange}
                            id="newsletter-type"
                            label={t('newsletter.help-modal.type')}
                            name="type"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            disabled={disabled}
                            value={topic.value}
                            name="topic"
                            variant="outlined"
                            label={
                                topic.value
                                    ? t('newsletter.topic-input-label-filled')
                                    : t('newsletter.topic-input-label')
                            }
                            required
                            onChange={handleChange}
                            fullWidth
                            error={topic.error}
                            helperText={topic.error ? t('newsletter.topic-helper-text') : null}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <WorkSpace message={message.value} setFields={setFields} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};
