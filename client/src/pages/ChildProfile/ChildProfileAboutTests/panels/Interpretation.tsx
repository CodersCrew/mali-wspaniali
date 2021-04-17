import { useTranslation } from 'react-i18next';
import { makeStyles, Box, Typography } from '@material-ui/core';

import { Panel } from '../Panel';
import interpretationImage from '../../../../assets/testInformation/Interpretation/testInformationInterpretation.png';

const T_PREFIX = 'child-profile.tests-informations.interpretation';

export const Interpretation = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Panel title={t(`${T_PREFIX}.panelTitle`)}>
            <Box className={classes.container}>
                <Box>
                    <Typography variant="h4" color="textPrimary" className={classes.title}>
                        {t(`${T_PREFIX}.title1`)}
                    </Typography>
                    <ul className={classes.ul}>
                        {[...Array(4)].map((_, index: number) => (
                            <li key={index}>
                                <Typography color="textPrimary" variant="body2">
                                    {t(`${T_PREFIX}.text${index + 1}`)}
                                </Typography>
                            </li>
                        ))}
                    </ul>
                    <Typography color="textPrimary" variant="h4" className={classes.title}>
                        {t(`${T_PREFIX}.title2`)}
                    </Typography>
                    <ul className={classes.ul}>
                        {[...Array(6)].map((_, index: number) => (
                            <li key={index}>
                                <Typography variant="body2">{t(`${T_PREFIX}.text${index + 5}`)}</Typography>
                            </li>
                        ))}
                    </ul>
                </Box>
                <Box className={classes.image}>
                    <img src={interpretationImage}></img>
                </Box>
            </Box>
        </Panel>
    );
};

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(3),
    },

    container: {
        display: 'grid',
        gridGap: theme.spacing(1.5),
        gridTemplateColumns: '3fr 1fr',
    },
    image: {
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    ul: {
        paddingLeft: 14,
    },
}));
