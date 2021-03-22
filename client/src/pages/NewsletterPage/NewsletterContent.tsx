import { FocusEvent } from 'react';
import { FormikErrors, FormikTouched } from 'formik';
import { useTranslation } from 'react-i18next';
import { TextField, IconButton, Card, CardHeader, CardContent, Divider, Grid } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import { openDialog } from '../../utils/openDialog';
import { HelpModal } from './HelpModal';
import { Workspace } from './Workspace';
import { SingleSelect } from './SingleSelect';
import { newsletterTypes } from './data';
import { NewsletterType, NewsletterFormValues } from './types';

interface Props {
    onChange: (name: string, value: string) => void;
    onBlur: (e: FocusEvent<HTMLInputElement>) => void;
    type: NewsletterType | '';
    topic: string;
    message: string;
    errors: FormikErrors<NewsletterFormValues>;
    touched: FormikTouched<NewsletterFormValues>;
}

export const NewsletterContent = ({ onChange, onBlur, type, topic, message, errors, touched }: Props) => {
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
                            onChange={onChange}
                            onBlur={onBlur}
                            id="newsletter-type"
                            label={t('newsletter.help-modal.type')}
                            name="type"
                            error={errors.type}
                            touched={touched.type}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={topic}
                            name="topic"
                            variant="outlined"
                            label={topic ? t('newsletter.topic-input-label-filled') : t('newsletter.topic-input-label')}
                            onChange={({ target: { name, value } }) => onChange(name, value)}
                            onBlur={onBlur}
                            fullWidth
                            error={touched.topic && !!errors.topic}
                            helperText={touched.topic && !!errors.topic && t(errors.topic)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Workspace value={message} onChange={onChange} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};
