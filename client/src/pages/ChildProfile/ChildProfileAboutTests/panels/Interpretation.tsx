import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, Box, Typography } from '@material-ui/core';
import { Panel } from '../Panel';
import { panelTextColor } from '../../../../colors';
import interpretationImage from '../../../../assets/testInformation/Interpretation/testInformationInterpretation.png';

const T_PREFIX = 'child-profile.tests-informations.interpretation';

export const Interpretation = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Panel title={t(`${T_PREFIX}.panelTitle`)}>
            <Box className={classes.container}>
                <Box>
                    <Typography className={classes.title}>{t(`${T_PREFIX}.title1`)}</Typography>
                    <ul className={classes.ul}>
                        <li>
                            <Typography className={classes.text}>{t(`${T_PREFIX}.text1`)}</Typography>
                        </li>
                        <li>
                            <Typography className={classes.text}>{t(`${T_PREFIX}.text2`)}</Typography>
                        </li>
                        <li>
                            <Typography className={classes.text}>{t(`${T_PREFIX}.text3`)}</Typography>
                        </li>
                        <li>
                            <Typography className={classes.text}>{t(`${T_PREFIX}.text4`)}</Typography>
                        </li>
                    </ul>
                    <Typography className={classes.title}>{t(`${T_PREFIX}.title2`)}</Typography>
                    <ul className={classes.ul}>
                        <li>
                            <Typography className={classes.text}>{t(`${T_PREFIX}.text5`)}</Typography>
                        </li>
                        <li>
                            <Typography className={classes.text}>{t(`${T_PREFIX}.text6`)}</Typography>
                        </li>
                        <li>
                            <Typography className={classes.text}>{t(`${T_PREFIX}.text7`)}</Typography>
                        </li>
                        <li>
                            <Typography className={classes.text}>{t(`${T_PREFIX}.text8`)}</Typography>
                        </li>
                        <li>
                            <Typography className={classes.text}>{t(`${T_PREFIX}.text9`)}</Typography>
                        </li>
                    </ul>
                </Box>
                <Box>
                    <img src={interpretationImage}></img>
                </Box>
            </Box>
        </Panel>
    );
};

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: 21,
        fontWeight: 500,
        lineHeight: '29.4px',
        color: panelTextColor,
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(3),
    },
    text: {
        fontSize: 15,
        color: panelTextColor,
    },
    container: {
        display: 'flex',

        [theme.breakpoints.down('md')]: {
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gridGap: theme.spacing(1.5),
            margin: theme.spacing(4, 'auto'),
        },
    },
    ul: {
        paddingLeft: 14,
    },
}));
