import { Box, Typography } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';

import { RegistrationFeedbackProps } from './types';

export const RegistrationFeedback = ({ classWrapper }: RegistrationFeedbackProps) => {
    const { t } = useTranslation();

    return (
        <div className={classWrapper}>
            <Typography variant="h3">{t('registration-page.register-success-title')}</Typography>
            <Box mb={2.5} />
            <Typography variant="body1">{t('registration-page.register-success-content')}</Typography>
            <Box mb={1} />
            <Typography variant="body1">{t('registration-page.register-success-spam')}</Typography>
        </div>
    );
};
