import React, { useState } from 'react';
import { Me } from '../../graphql/types';
import { ChangePasswordPanel } from './ChangePasswordPanel/ChangePasswordPanel';
import { ExpansionPanelItem } from './ExpansionPanelItem';
import { DefaultLanguagePanel } from './DefaultLanguagePanel/DefaultLanguagePanel';
import { LegalNotesPanel } from './LegalNotesPanel/LegalNotesPanel';
import { ConsentsPanel } from './ConsentsPanel/ConsentsPanel';
import { AccountDeletionPanel } from './AccountDeletionPanel/AccountDeletionPanel';

interface Props {
    user: Me;
}

export function ParentSettingsExpansionPanel({ user }: Props) {
    const [expandedPanel, setExpandedPanel] = useState<string>('');

    const togglePanelExpansion = (name: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpandedPanel(isExpanded ? name : '');
    };

    return (
        <>
            <ExpansionPanelItem
                user={user}
                name={'password-change-panel'}
                onTogglePanelExpansion={togglePanelExpansion('password-change-panel')}
                expanded={expandedPanel === 'password-change-panel'}
                title={'settings-page.parent.password-change.title'}
                panel={ChangePasswordPanel}
            />

            <ExpansionPanelItem
                user={user}
                name={'language-selection-panel'}
                onTogglePanelExpansion={togglePanelExpansion('language-selection-panel')}
                expanded={expandedPanel === 'language-selection-panel'}
                title={'settings-page.parent.language-selection.title'}
                panel={DefaultLanguagePanel}
            />

            <ExpansionPanelItem
                user={user}
                name={'legal-notes-panel'}
                onTogglePanelExpansion={togglePanelExpansion('legal-notes-panel')}
                expanded={expandedPanel === 'legal-notes-panel'}
                title={'settings-page.parent.legal-notes.title'}
                panel={LegalNotesPanel}
            />

            <ExpansionPanelItem
                user={user}
                name={'consents-panel'}
                onTogglePanelExpansion={togglePanelExpansion('consents-panel')}
                expanded={expandedPanel === 'consents-panel'}
                title={'settings-page.parent.consents.title'}
                panel={ConsentsPanel}
            />

            <ExpansionPanelItem
                user={user}
                name={'account-deletion-panel'}
                onTogglePanelExpansion={togglePanelExpansion('account-deletion-panel')}
                expanded={expandedPanel === 'account-deletion-panel'}
                title={'settings-page.parent.delete-account.title'}
                panel={AccountDeletionPanel}
            />
        </>
    );
}
