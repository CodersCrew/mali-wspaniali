import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { activePage } from '../../apollo_client';
import { ButtonSecondary } from '../../components/Button';
import { CustomContainer } from '../../components/CustomContainer';
import { PageContainer } from '../../components/PageContainer';
import { Search } from './Search';

export default function ArchivePage() {
    React.useEffect(() => {
        activePage(['admin-menu.newsletter.title', 'admin-menu.newsletter.archive']);
    }, []);
    const { t } = useTranslation();

    const [options, setOptions] = React.useState<Record<string, string>>({});

    return (
        <PageContainer>
            <CustomContainer
                header={<Typography variant="h4">{t('newsletter-archive.search.title')}</Typography>}
                container={
                    <Box p={2} display="flex" flexDirection="column">
                        <Search
                            values={options}
                            onValuesChange={(name, value) => setOptions((prev) => ({ ...prev, [name]: value }))}
                        />

                        <Box display="flex" justifyContent="flex-end">
                            <ButtonSecondary variant="contained" innerText={t('newsletter-archive.search.button')} />
                        </Box>
                    </Box>
                }
            />
            <Box mt={4} mb={3}>
                <Typography variant="h4">{t('newsletter-archive.list.title')}</Typography>
            </Box>
        </PageContainer>
    );
}
