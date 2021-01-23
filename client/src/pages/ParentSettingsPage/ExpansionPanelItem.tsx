import React, { FC } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useTranslation } from 'react-i18next';
import { Me } from '../../graphql/types';

export interface Props {
    user: Me;
    name: string;
    onTogglePanelExpansion: (name: string) => void;
    expanded: boolean;
    title: string;
    panel: FC<{ user: Me; onToggle: (name: string) => void; name: string }>;
}

export function ExpansionPanelItem({ user, name, onTogglePanelExpansion, expanded, title, panel }: Props) {
    const { t } = useTranslation();

    const Panel = panel;

    return (
        <Accordion expanded={expanded} onChange={() => onTogglePanelExpansion(name)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${name}"-content"`}
                id={`${name}"-title"`}
            >
                <Typography variant={'subtitle2'}>{t(title)}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Panel user={user} onToggle={onTogglePanelExpansion} name={name} />
            </AccordionDetails>
        </Accordion>
    );
}
