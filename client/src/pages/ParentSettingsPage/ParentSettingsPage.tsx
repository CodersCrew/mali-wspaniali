import React, { useContext, useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ParentSettingsExpansionPanel } from './ParentSettingsExpansionPanel';
import { UserContext } from '../AppWrapper';
import { activePage } from '../../apollo_client';
import { PageTitle } from '../../components/PageTitle/PageTitle';

export const ParentSettingsPage = () => {
    const user = useContext(UserContext);
    const { t } = useTranslation();

    useEffect(() => {
        activePage(['parent-menu.settings']);
    }, []);

    if (!user) return null;

    return (
        <Container maxWidth="xl">
            <PageTitle text={t('settings-page.header')} />
            <Typography variant="h6" gutterBottom>
                {t('settings-page.parent.description')}
            </Typography>
            <ParentSettingsExpansionPanel user={user} />
        </Container>
    );
};
