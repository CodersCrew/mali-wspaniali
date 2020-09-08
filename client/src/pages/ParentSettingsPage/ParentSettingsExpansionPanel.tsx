import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ChangePasswordPanel } from './ChangePasswordPanel';
import { DefaultLanguagePanel } from './DefaultLanguagePanel';
import { LegalNotesPanel } from './LegalNotesPanel';
import { ConsentsPanel } from './ConsentsPanel';
import { AccountDeletionPanel } from './AccountDeletionPanel';
import { Me } from '../../graphql/types';
import { ExpansionPanelItem } from './ExpansionPanelItem';

interface Props {
    user: Me;
}

export const ParentSettingsExpansionPanel = ({ user }: Props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.root}>
            <ExpansionPanelItem
                user={user}
                name={'password-change-panel'}
                handle={handleChange('password-change-panel')}
                expanded={expanded === 'password-change-panel'}
                heading={'settings-page.parent.password-change'}
                panel={ChangePasswordPanel}
            />

            <ExpansionPanelItem
                user={user}
                name={'language-selection-panel'}
                handle={handleChange('language-selection-panel')}
                expanded={expanded === 'language-selection-panel'}
                heading={'settings-page.parent.language-selection'}
                panel={DefaultLanguagePanel}
            />

            <ExpansionPanelItem
                user={user}
                name={'legal-notes-panel'}
                handle={handleChange('legal-notes-panel')}
                expanded={expanded === 'legal-notes-panel'}
                heading={'settings-page.parent.legal-notes.heading'}
                panel={LegalNotesPanel}
            />

            <ExpansionPanelItem
                user={user}
                name={'consents-panel'}
                handle={handleChange('consents-panel')}
                expanded={expanded === 'consents-panel'}
                heading={'settings-page.parent.consents'}
                panel={ConsentsPanel}
            />

            <ExpansionPanelItem
                user={user}
                name={'account-deletion-panel'}
                handle={handleChange('account-deletion-panel')}
                expanded={expanded === 'account-deletion-panel'}
                heading={'settings-page.parent.delete-account.header'}
                panel={AccountDeletionPanel}
            />
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            marginTop: theme.spacing(4),
        },
    }),
);
