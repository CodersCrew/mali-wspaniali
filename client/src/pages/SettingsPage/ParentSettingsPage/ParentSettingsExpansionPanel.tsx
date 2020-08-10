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

export const ParentSettingsExpansionPanel = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.root}>
            <ExpansionPanel
                expanded={expanded === 'password-change-panel'}
                onChange={handleChange('password-change-panel')}
            >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="password-change-panel-content"
                    id="password-panel-header"
                >
                    <Typography className={classes.heading}>{t('settings-page.parent.password-change')}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <ChangePasswordPanel />
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
                expanded={expanded === 'language-selection-panel'}
                onChange={handleChange('language-selection-panel')}
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
            <ExpansionPanel expanded={expanded === 'legal-notes-panel'} onChange={handleChange('legal-notes-panel')}>
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
            <ExpansionPanel expanded={expanded === 'consents-panel'} onChange={handleChange('consents-panel')}>
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
    }),
);
