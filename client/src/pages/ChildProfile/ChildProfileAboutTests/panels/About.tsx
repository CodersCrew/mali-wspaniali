import { useTranslation } from 'react-i18next';
import { makeStyles, Box, Grid, Typography, Theme } from '@material-ui/core';

import { Panel } from '../Panel';
import aboutImage from '@app/assets/testInformation/About/testInformationAbout.png';
import { useIsDevice } from '../../../../queries/useBreakpoints';

const T_PREFIX = 'child-profile.tests-informations.about';

export const About = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const device = useIsDevice();

    return (
        <Panel title={t(`${T_PREFIX}.panelTitle`)}>
            <Grid container spacing={device.isDesktop ? 3 : 2}>
                <Grid item xs={12} md={9}>
                    <Typography variant="h4">{t(`${T_PREFIX}.title`)}</Typography>
                    <Typography variant="body1" className={classes.text}>
                        {t(`${T_PREFIX}.text1`)}
                    </Typography>
                    <Typography variant="body1" className={classes.text}>
                        {t(`${T_PREFIX}.text2-1`)} &nbsp;
                        <strong>{t(`${T_PREFIX}.text2-test-names`)}</strong>
                        {t(`${T_PREFIX}.text2-2`)}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Box display="flex" justifyContent="center">
                        <img src={aboutImage} width={195} alt="placeholder" />
                    </Box>
                </Grid>
            </Grid>
        </Panel>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    text: {
        marginTop: theme.spacing(2),
    },
    container: { display: 'grid', alignItems: 'center', gridGap: theme.spacing(1.5), gridTemplateColumns: '3fr 1fr' },
}));
