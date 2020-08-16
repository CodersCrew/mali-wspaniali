import React, {FC, ReactNode} from 'react';
import { ExpansionPanel as ExpansionPanelMaterial, ExpansionPanelProps }  from '@material-ui/core';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';


export type CustomExpansionPanel = ExpansionPanelProps & {
    panelDetailsClassName: string;
    childrenOfDetailsPanel: ReactNode;
};

export const ExpansionPanel: FC<CustomExpansionPanel> = ({expanded, className, children, panelDetailsClassName, childrenOfDetailsPanel ,...props}) => {

    return(
        <ExpansionPanelMaterial {...props} expanded={expanded} className={className}>
            {children || ''}
            <ExpansionPanelDetails className={panelDetailsClassName}>{childrenOfDetailsPanel}</ExpansionPanelDetails>
        </ExpansionPanelMaterial>
    );
};
