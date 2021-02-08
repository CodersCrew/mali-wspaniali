import React, { FC } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles, AccordionSummary, Typography } from '@material-ui/core';
import { panelTextColor } from '../../../colors';

export const PanelSummary: FC = ({ children }) => {
    const classes = useStyles();

    return (
        <AccordionSummary className={classes.summary} expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.title}>{children}</Typography>
        </AccordionSummary>
    );
};

const useStyles = makeStyles((theme) => ({
    summary: {
        paddingLeft: theme.spacing(5),
    },
    title: {
        fontSize: 15,
        lineHeight: '21px',
        color: panelTextColor,
    },
}));
