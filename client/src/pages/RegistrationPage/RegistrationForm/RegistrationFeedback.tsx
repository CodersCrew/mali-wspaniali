import React from 'react';
import { Typography } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RegistrationFeedbackProps } from './types';

export const RegistrationFeedback = ({
    classLink,
    classHeader,
    classWrapper,
}: RegistrationFeedbackProps) => {
    const { t } = useTranslation();

    return (
        <div className={classWrapper}>
            <div className={classHeader}>
                {t('registration-page.register-success')}
            </div>
            <Typography>
                {t('registration-page.register-success-text')}
            </Typography>
            <Link className={classLink} to="/">
                {t('registration-page.go-to-homepage')}
            </Link>
        </div>
    );
};
