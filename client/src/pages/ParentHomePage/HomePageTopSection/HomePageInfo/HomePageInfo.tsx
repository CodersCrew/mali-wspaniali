import { makeStyles, createStyles, Theme, Typography, Paper } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import { HomePageInfoPropTypes } from './types';

export const HomePageInfo = ({ toggleInfoComponent }: HomePageInfoPropTypes) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Paper className={classes.infoContainer}>
            <Close className={classes.contentCloseIcon} onClick={() => toggleInfoComponent()} />
            <Typography variant="h4" className={classes.contentTitle}>
                {t('home-page-content.foundation-header')}
            </Typography>
            <Typography variant="body1" className={classes.contentDescription}>
                {t('home-page-content.foundation-content')}
            </Typography>
            <Typography variant="body1">{t('home-page-content.foundation-content-summary')}</Typography>
        </Paper>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        infoContainer: {
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing(2),
            position: 'relative',
            textAlign: 'left',
            marginTop: theme.spacing(2),

            [theme.breakpoints.down('md')]: {
                marginTop: theme.spacing(4),
            },
        },
        contentCloseIcon: {
            width: 14,
            height: 14,
            position: 'absolute',
            top: 14,
            right: 14,
            cursor: 'pointer',

            [theme.breakpoints.down('md')]: {
                width: 20,
                height: 20,
                top: 10,
                right: 10,
            },
        },
        contentTitle: {
            marginBottom: theme.spacing(2),
        },
        contentDescription: {
            marginBottom: theme.spacing(2),
        },
    }),
);
