import { Box, Link } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { DownloadIcon } from '../../../components/Icons/DownloadIcon';

export function LegalNotesPanel() {
    const { t } = useTranslation();

    return (
        <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start">
            <Link href={t('registration-page.agreements.terms-and-conditions-link')} target="_blank">
                <Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center">
                    <DownloadIcon color="primary" />
                    <Box mr={1} />
                    {t('registration-page.agreements.terms-and-conditions')}
                </Box>
            </Link>
            <Box mb={3} />
            <Link href={t('registration-page.agreements.resignation-link')} target="_blank">
                <Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center">
                    <DownloadIcon color="primary" />
                    <Box mr={1} />
                    {t('registration-page.agreements.resignation-label')}
                </Box>
            </Link>
            <Box mb={3} />
            <Link href={t('registration-page.agreements.privacy-policy-link')} target="_blank">
                <Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center">
                    <DownloadIcon color="primary" />
                    <Box mr={1} />
                    {t('registration-page.agreements.privacy-policy')}
                </Box>
            </Link>
            <Box mb={2} />
        </Box>
    );
}
