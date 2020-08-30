import React, { FC } from 'react';
import { Accordion, AccordionDetails } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { PanelSummary } from './PanelSummary';

interface Props {
    title: string;
}

export const Panel: FC<Props> = ({ title, children }) => {
    const classes = useStyles();

    return (
        <Accordion className={classes.panel}>
            <PanelSummary>{title}</PanelSummary>
            <AccordionDetails className={classes.details}>
                {children}
            </AccordionDetails>
        </Accordion>
    );
};

const useStyles = makeStyles((theme) => ({
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
