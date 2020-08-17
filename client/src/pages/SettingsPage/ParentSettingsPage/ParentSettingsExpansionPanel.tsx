import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useTranslation } from 'react-i18next';
import { ChangePasswordPanel } from '../ChangePasswordPanel';
import { DefaultLanguagePanel } from '../DefaultLanguagePanel';
import { LegalNotesPanel } from '../LegalNotesPanel';
import { ConsentsPanel } from '../ConsentsPanel';
import { AccountDeletionPanel } from '../AccountDeletionPanel';
import { Me } from '../../../graphql/types';

interface Props {
    user: Me;
}

export const ParentSettingsExpansionPanel = ({ user }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [expanded, setExpanded] = React.useState<string>('');

    const handleChange = (panel: string) => {
        setExpanded(prev => (prev === panel ? '' : panel));
    };

    const isExpanded = (panel: string) => panel === expanded;

    return (
        <div className={classes.root}>
            <ExpansionPanel
                expanded={isExpanded('password-change-panel')}
                onChange={() => handleChange('password-change-panel')}
            >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="password-change-panel-content"
                    id="password-panel-header"
                >
                    <Typography className={classes.heading}>{t('settings-page.parent.password-change')}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.expansionContainer}>
                    <div className={classes.expansionItem}>
                        <ChangePasswordPanel user={user} />
                    </div>
                    <div className={classes.expansionItem}>Wystąpiły trudności podczas zmiany hasła? </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel
                expanded={isExpanded('language-selection-panel')}
                onChange={() => handleChange('language-selection-panel')}
            >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="language-selection-panel-content"
                    id="language-selection-panel-header"
                >
                    <Typography className={classes.heading}>{t('settings-page.parent.language-selection')}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <DefaultLanguagePanel />
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel
                expanded={isExpanded('legal-notes-panel')}
                onChange={() => handleChange('legal-notes-panel')}
            >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="legal-notes-panel-content"
                    id="legal-notes-panel-header"
                >
                    <Typography className={classes.heading}>{t('settings-page.legal-notes.heading')}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <LegalNotesPanel />
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel expanded={isExpanded('consents-panel')} onChange={() => handleChange('consents-panel')}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="consents-panel-content"
                    id="consents-panel-header"
                >
                    <Typography className={classes.heading}>{t('settings-page.parent.consents')}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <ConsentsPanel />
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel
                expanded={isExpanded('account-deletion-panel')}
                onChange={() => handleChange('account-deletion-panel')}
            >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="account-deletion-panel-content"
                    id="account-deletion-panel-header"
                >
                    <Typography className={classes.heading}>
                        {t('settings-page.parent.delete-account.header')}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <AccountDeletionPanel />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
            fontWeight: 'bold',
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
        expansionContainer: {
            display: 'flex',
        },
        expansionItem: {
            flex: 1,
        },
    }),
);
