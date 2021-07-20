import { Box, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { newsletterTypes } from '../NewsletterPage/data';
import { SingleSelect } from '../NewsletterPage/SingleSelect';

interface SearchProps {
    values: Record<string, string>;
    onValuesChange: (name: string, value: string) => void;
}

export function Search(props: SearchProps) {
    const { t } = useTranslation();

    return (
        <>
            <Box mb={2}>
                <SingleSelect
                    stateData={props.values.type}
                    optionsValues={newsletterTypes}
                    onChange={props.onValuesChange}
                    id="newsletter-type"
                    label={t('newsletter.help-modal.type')}
                    name="type"
                />
            </Box>
            <Box mb={2}>
                <TextField
                    value={props.values.mail}
                    name="mail"
                    variant="outlined"
                    label={t('newsletter-archive.search.search-by-email')}
                    onChange={(e) => props.onValuesChange('mail', e.target.value)}
                    fullWidth
                />
            </Box>
        </>
    );
}
