import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { PanelSummary } from './PanelSummary';
import { ExpansionPanel } from '../../../components/ExpansionPanel';

interface Props {
    title: string;
}

export const Panel: FC<Props> = ({ title, children }) => {
    const classes = useStyles();

    return (
        <ExpansionPanel className={classes.panel} panelDetails={{className: classes.details, children}}>
            <PanelSummary>{title}</PanelSummary>
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
