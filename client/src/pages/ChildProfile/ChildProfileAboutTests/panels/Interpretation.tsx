import React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Panel } from '../Panel';
import { panelTextColor } from '../../../../colors';

const T_PREFIX = 'child-profile.tests-informations.interpretation';

export const Interpretation = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Panel title={t(`${T_PREFIX}.panelTitle`)}>
            <Typography className={classes.title}>
                {t(`${T_PREFIX}.title`)}
            </Typography>
            <Typography className={classes.text}>
                {t(`${T_PREFIX}.text1`)}
            </Typography>
            <Typography className={classes.text}>
                {t(`${T_PREFIX}.text2`)}
            </Typography>
            <Typography className={classes.text}>
                {t(`${T_PREFIX}.text3`)}
            </Typography>
            <Typography className={classes.text}>
                {t(`${T_PREFIX}.text4`)}
            </Typography>
        </Panel>
    );
};

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: 21,
        fontWeight: 500,
        lineHeight: '29.4px',
        color: panelTextColor,
    },
    text: {
        marginTop: theme.spacing(2),
        fontSize: 15,
        lineHeight: '21px',
        color: panelTextColor,
    },
}));
