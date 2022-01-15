import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles, AccordionSummary, Typography } from '@material-ui/core';

export const PanelSummary: FC = ({ children }) => {
    const classes = useStyles();

    return (
        <AccordionSummary className={classes.summary} expandIcon={<ExpandMoreIcon />}>
            <Typography color="textPrimary" variant="subtitle2">
                {children}
            </Typography>
        </AccordionSummary>
    );
};

const useStyles = makeStyles((theme) => ({
    summary: {
        paddingLeft: theme.spacing(5),
    },
}));
