import React, { Dispatch, SetStateAction, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, IconButton, Card, CardHeader, CardContent, Divider, Grid } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { WorkSpace } from './Workspace';
import { openDialog } from '../../utils/openDialog';
import { HelpModal } from './HelpModal';
import { newsletterTypes } from './data';
import { SingleSelect } from './SingleSelect';
import { NewsletterState } from './types';

type NewsletterContentProps = {
    handleChange: (e: ChangeEvent<{ name?: string; value: unknown }>) => void;
    type: {
        value: string;
        error: boolean;
    };
    topic: {
        value: string;
        error: boolean;
    };
    message: {
        value: string;
        error: boolean;
    };
    setFields: Dispatch<SetStateAction<NewsletterState>>;
};

export const NewsletterContent = ({ handleChange, type, topic, message, setFields }: NewsletterContentProps) => {
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
