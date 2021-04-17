import { useTranslation } from 'react-i18next';
import { makeStyles, Box, Typography, Theme } from '@material-ui/core';

import { Panel } from '../Panel';
import aboutImage from '../../../../assets/testInformation/About/testInformationAbout.png';

const T_PREFIX = 'child-profile.tests-informations.about';

export const About = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Panel title={t(`${T_PREFIX}.panelTitle`)}>
            <Box className={classes.container}>
                <Box>
                    <Typography color="textPrimary">{t(`${T_PREFIX}.title`)}</Typography>
                    <Typography variant="body1" color="textPrimary" className={classes.text}>
                        {t(`${T_PREFIX}.text1`)}
                    </Typography>
                    <Typography variant="body1" color="textPrimary" className={classes.text}>
                        {t(`${T_PREFIX}.text2-1`)}
                        <strong className={classes.strong}>{t(`${T_PREFIX}.text2-test-names`)}</strong>
                        {t(`${T_PREFIX}.text2-2`)}
                    </Typography>
                </Box>
                <img className={classes.image} src={aboutImage} alt="placeholder" />
            </Box>
        </Panel>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    text: {
        marginTop: theme.spacing(2),
    },
    container: { display: 'grid', alignItems: 'center', gridGap: theme.spacing(1.5), gridTemplateColumns: '3fr 1fr' },
    image: {
        marginLeft: theme.spacing(6),
        width: 195,
        height: 242,

        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    strong: {
        fontWeight: 'bold',
        color: theme.palette.text.primary,
    },
}));
