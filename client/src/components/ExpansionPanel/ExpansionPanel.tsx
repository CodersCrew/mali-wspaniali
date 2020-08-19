import React, {FC, ReactNode} from 'react';
import { ExpansionPanel as ExpansionPanelMaterial, ExpansionPanelProps }  from '@material-ui/core';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';


export type CustomExpansionPanel = ExpansionPanelProps & {
    panelDetails: {
        className: string;
        children: ReactNode;
    }
};

export const ExpansionPanel: FC<CustomExpansionPanel> = ({expanded, className, children, panelDetails ,...props}) => {

    return(
        <ExpansionPanelMaterial {...props} expanded={expanded} className={className}>
            {children}
            <ExpansionPanelDetails className={panelDetails.className}>{panelDetails.children}</ExpansionPanelDetails>
        </ExpansionPanelMaterial>
    );
};
