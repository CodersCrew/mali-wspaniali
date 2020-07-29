import React, {FC} from 'react';
import { ExpansionPanel, ExpansionPanelProps } from '@material-ui/core';


export type CustomExpansionPanel = ExpansionPanelProps & {
    expanded: boolean;
}

export const ExpansionPanelExtended: FC<CustomExpansionPanel> = ({expanded, className, children ,...props}) => {

    let content: any;
    if (children) {
        content = children;
    }

    return(
        <ExpansionPanel {...props} expanded={expanded} className={className}>
            {content}
        </ExpansionPanel>
    );
};
