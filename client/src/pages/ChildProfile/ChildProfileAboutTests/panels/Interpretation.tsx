import { useTranslation } from 'react-i18next';
import { makeStyles, Typography, Grid, Box } from '@material-ui/core';

import { Panel } from '../Panel';
import interpretationImage from '@app/assets/testInformation/Interpretation/testInformationInterpretation.png';
import { useIsDevice } from '../../../../queries/useBreakpoints';

const T_PREFIX = 'child-profile.tests-informations.interpretation';

export const Interpretation = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const device = useIsDevice();

    return (
        <Panel title={t(`${T_PREFIX}.panelTitle`)}>
            <Grid container spacing={device.isDesktop ? 3 : 2}>
                <Grid item xs={12} md={9}>
                    <Box mb={3}>
                        <Typography variant="h4" color="textPrimary">
                            {t(`${T_PREFIX}.title1`)}
                        </Typography>
                    </Box>
                    <ul className={classes.ul}>
                        {[...Array(5)].map((_, index: number) => (
                            <li key={index}>
                                <Typography color="textPrimary" variant="body1">
                                    {t(`${T_PREFIX}.text${index + 1}`)}
                                </Typography>
                            </li>
                        ))}
                    </ul>
                    <Box mb={3}>
                        <Typography color="textPrimary" variant="h4">
                            {t(`${T_PREFIX}.title2`)}
                        </Typography>
                    </Box>
                    <ul className={classes.ul}>
                        {[...Array(6)].map((_, index: number) => (
                            <li key={index}>
                                <Typography variant="body1">{t(`${T_PREFIX}.text${index + 6}`)}</Typography>
                            </li>
                        ))}
                    </ul>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Box display="flex" justifyContent="center">
                        <img src={interpretationImage} width={243}></img>
                    </Box>
                </Grid>
            </Grid>
        </Panel>
    );
};

const useStyles = makeStyles(() => ({
    ul: {
        paddingLeft: 14,
    },
}));
