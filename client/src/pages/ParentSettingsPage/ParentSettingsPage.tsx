import React, { useContext, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { ParentSettingsExpansionPanel } from './ParentSettingsExpansionPanel';
import { UserContext } from '../AppWrapper';
import { activePage } from '../../apollo_client';

export const ParentSettingsPage = () => {
    const user = useContext(UserContext);

    useEffect(() => {
        activePage(['parent-menu.settings']);
    }, []);

    if (!user) return null;

    return (
        <Container maxWidth="xl">
            <ParentSettingsExpansionPanel user={user} />
        </Container>
    );
};
