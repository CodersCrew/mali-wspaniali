import React, { useState } from 'react';
import { ChangePasswordPanel } from './ChangePasswordPanel/ChangePasswordPanel';
import { ExpansionPanelItem } from './ExpansionPanelItem';
import { LegalNotesPanel } from './LegalNotesPanel/LegalNotesPanel';
import { AccountDeletionPanel } from './AccountDeletionPanel/AccountDeletionPanel';
import { Me } from '../../graphql/types';

interface Props {
    user: Me;
}

export function ParentSettingsExpansionPanel({ user }: Props) {
    const [expandedPanel, setExpandedPanel] = useState<string>('');

    const togglePanelExpansion = (name: string) => {
        setExpandedPanel(name !== expandedPanel ? name : '');
    };

    return (
        <>
            <ExpansionPanelItem
                user={user}
                name={'password-change-panel'}
                onTogglePanelExpansion={togglePanelExpansion}
                expanded={expandedPanel === 'password-change-panel'}
                title={'settings-page.parent.password-change.title'}
                panel={ChangePasswordPanel}
            />
            <ExpansionPanelItem
                user={user}
                name={'legal-notes-panel'}
                onTogglePanelExpansion={togglePanelExpansion}
                expanded={expandedPanel === 'legal-notes-panel'}
                title={'settings-page.parent.legal-notes.title'}
                panel={LegalNotesPanel}
            />
            <ExpansionPanelItem
                user={user}
                name={'account-deletion-panel'}
                onTogglePanelExpansion={togglePanelExpansion}
                expanded={expandedPanel === 'account-deletion-panel'}
                title={'settings-page.parent.delete-account.title'}
                panel={AccountDeletionPanel}
            />
        </>
    );
}
