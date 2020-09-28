import React, { useEffect } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    createStyles,
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useTranslation } from 'react-i18next';

import { activePage } from '../../apollo_client';
import { KeyCodes } from './KeyCodes/KeyCodes';

export function AdminSettingsPage() {
    const { t } = useTranslation();
    const classes = useStyles();

    useEffect(() => {
        activePage(['admin-menu.settings']);
    }, []);

    return (
        <div className={classes.container}>
            <Typography variant="h3" classes={{ root: classes.sectionTitle }}>
                {t('admin-setting-page.account-management')}
            </Typography>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography variant="subtitle2">{t('admin-setting-page.keycode-generation.title')}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <KeyCodes />
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(3),
        },
        sectionTitle: {
            marginBottom: theme.spacing(3),
        },
    }),
);
