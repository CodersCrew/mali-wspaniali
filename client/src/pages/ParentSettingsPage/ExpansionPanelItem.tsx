import React, { FC } from 'react';
import { Accordion, AccordionSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { useTranslation } from 'react-i18next';
import { Me } from '../../graphql/types';

export interface ExpansionPanelItem {
    user: Me;
    name: string;
    onTogglePanelExpansion: (name: string) => void;
    expanded: boolean;
    title: string;
    panel: FC<{ user: Me }>;
}

export function ExpansionPanelItem({ user, name, onTogglePanelExpansion, expanded, title, panel }: ExpansionPanelItem) {
    const { t } = useTranslation();

    const Panel = panel;

    return (
        <Accordion expanded={expanded} onChange={() => onTogglePanelExpansion(name)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${name}"-content"`}
                id={`${name}"-title"`}
            >
                <Typography variant={'body2'}>{t(title)}</Typography>
            </AccordionSummary>
            <ExpansionPanelDetails>
                <Panel user={user} />
            </ExpansionPanelDetails>
        </Accordion>
    );
}
