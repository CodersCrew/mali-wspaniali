import { Box, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { CustomContainer } from '../../components/CustomContainer';
import { newsletterTypes } from '../NewsletterPage/data';
import { SingleSelect } from '../NewsletterPage/SingleSelect';

export function Search() {
    const { t } = useTranslation();

    return (
        <CustomContainer
            header={t('newsletter-archive.search.title')}
            container={
                <Box p={2}>
                    <Box mb={2}>
                        <SingleSelect
                            stateData={'type'}
                            optionsValues={newsletterTypes}
                            onChange={onChange}
                            onBlur={onBlur}
                            id="newsletter-type"
                            label={t('newsletter.help-modal.type')}
                            name="type"
                        />
                    </Box>
                    <TextField
                        value={'topic'}
                        name="topic"
                        variant="outlined"
                        label={t('newsletter-archive.search.title')}
                        onChange={onChange}
                        onBlur={onBlur}
                        fullWidth
                    />
                </Box>
            }
        />
    );

    function onChange() {
        console.log('on change');
    }

    function onBlur() {
        console.log('on blur');
    }
}
