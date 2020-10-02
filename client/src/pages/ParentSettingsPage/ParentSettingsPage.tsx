import React, { useContext, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { activePage } from '../../apollo_client';
import { UserContext } from '../AppWrapper';
import { ParentSettingsExpansionPanel } from './ParentSettingsExpansionPanel';

export function ParentSettingsPage() {
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
}
