import React, { FC } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { useTranslation } from 'react-i18next';
import { Me } from '../../graphql/types';

export interface ExpansionPanelItem {
    user: Me;
    name: string;
    handle: (event: React.ChangeEvent<{}>, isExpanded: boolean) => void;
    expanded: boolean;
    heading: string;
    panel: FC<{ user: Me }>;
}

export const ExpansionPanelItem = ({ user, name, handle, expanded, heading, panel }: ExpansionPanelItem) => {
    const { t } = useTranslation();

    const Panel = panel;

    return (
        <ExpansionPanel expanded={expanded} onChange={handle}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${name}"-content"`}
                id={`${name}"-header"`}
            >
                <Typography variant={'body2'}>{t(heading)}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Panel user={user} />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};
