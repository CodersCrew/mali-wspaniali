import React, { FC } from 'react';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

export const PanelSummary: FC = ({ children }) => {
    const classes = useStyles();

    return (
        <ExpansionPanelSummary className={classes.summary} expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.title}>{children}</Typography>
        </ExpansionPanelSummary>
    );
};

const useStyles = makeStyles(theme => ({
    summary: {
        paddingLeft: theme.spacing(5),
    },
    title: {
        fontSize: 15,
        lineHeight: '21px',
        color: '#1d1d1d',
    },
}));
