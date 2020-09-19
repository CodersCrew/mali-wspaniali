import React from 'react';
import {
    makeStyles,
    Typography,
    ExpansionPanel,
    createStyles,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Theme,
    withStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useTranslation } from 'react-i18next';

export const LegalNotesPanel = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Typography color={'primary'} className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummaryIconEnd expandIcon={<ExpandMoreIcon className={classes.moreIcon} />}>
                    <Typography className={classes.heading}>
                        {t('settings-page.parent.legal-notes.privacy-policy')}
                    </Typography>
                </ExpansionPanelSummaryIconEnd>
                <ExpansionPanelDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
                        amet blandit leo lobortis eget.
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
                <ExpansionPanelSummaryIconStart expandIcon={<ExpandMoreIcon className={classes.moreIcon} />}>
                    <Typography className={classes.heading}>
                        {t('settings-page.parent.legal-notes.regulations')}
                    </Typography>
                </ExpansionPanelSummaryIconStart>
                <ExpansionPanelDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
                        amet blandit leo lobortis eget.
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={''}>
                    <Typography className={classes.heading}>
                        Coś tam jeszcze
                        <ExpandMoreIcon />
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
                        amet blandit leo lobortis eget.
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Typography>
    );
};

const ExpansionPanelSummaryIconStart = withStyles({
    expandIcon: {
        order: -1,
    },
})(ExpansionPanelSummary);

const ExpansionPanelSummaryIconEnd = withStyles({
    expandIcon: {
        order: 0,
    },
})(ExpansionPanelSummary);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: { width: '100%' },
        heading: {
            color: theme.palette.primary.main,
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
        moreIcon: {
            color: theme.palette.primary.main,
        },
    }),
);
