import React, { FC } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { makeStyles } from '@material-ui/core/styles';
import { PanelSummary } from './PanelSummary';

interface Props {
    title: string;
}

export const Panel: FC<Props> = ({ title, children }) => {
    const classes = useStyles();

    return (
        <ExpansionPanel className={classes.panel}>
            <PanelSummary>{title}</PanelSummary>
            <ExpansionPanelDetails className={classes.details}>{children}</ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

const useStyles = makeStyles(theme => ({
    panel: {
        '&:first-child': {
            marginTop: 0,
            borderTopLeftRadius: 0,
        },
        '&.Mui-expanded:last-child': {
            marginTop: theme.spacing(2),
        },
    },
    details: {
        padding: theme.spacing(0, 5, 4),
        display: 'block',
    },
}));
