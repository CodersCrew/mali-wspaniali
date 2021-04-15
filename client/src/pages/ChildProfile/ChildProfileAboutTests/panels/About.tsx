import { useTranslation } from 'react-i18next';
import { makeStyles, Box, Typography } from '@material-ui/core';
import { Panel } from '../Panel';

const T_PREFIX = 'child-profile.tests-informations.about';

export const About = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Panel title={t(`${T_PREFIX}.panelTitle`)}>
            <Box display="flex" alignItems="center">
                <Box>
                    <Typography className={classes.title}>{t(`${T_PREFIX}.title`)}</Typography>
                    <Typography className={classes.text}>{t(`${T_PREFIX}.text1`)}</Typography>
                    <Typography className={classes.text}>
                        {t(`${T_PREFIX}.text2-1`)}{' '}
                        <strong className={classes.strong}>{t(`${T_PREFIX}.text2-test-names`)}</strong>{' '}
                        {t(`${T_PREFIX}.text2-2`)}
                    </Typography>
                </Box>
                <img className={classes.image} src="https://via.placeholder.com/257x141" alt="placeholder" />
            </Box>
        </Panel>
    );
};

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: 21,
        fontWeight: 500,
        lineHeight: '29.4px',
        color: theme.palette.text.primary,
    },
    text: {
        marginTop: theme.spacing(2),
        fontSize: 15,
        lineHeight: '21px',
        color: theme.palette.text.primary,
    },
    image: {
        marginLeft: theme.spacing(6),
        width: 257,
        height: 141,

        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    strong: {
        fontWeight: 'bold',
        color: theme.palette.text.primary,
    },
}));
