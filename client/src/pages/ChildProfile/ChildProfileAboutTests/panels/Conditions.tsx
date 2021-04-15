import { useTranslation } from 'react-i18next';
import { makeStyles, Box, Typography } from '@material-ui/core';
import { Panel } from '../Panel';
import { panelTextColor, lightTextColor } from '../../../../colors';

const T_PREFIX = 'child-profile.tests-informations.conditions';

export const Conditions = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    const tests = [
        {
            name: t(`${T_PREFIX}.test1-name`),
            image: 'https://via.placeholder.com/80x110',
            imageAlt: 'placeholder',
            description: t(`${T_PREFIX}.test1-description`),
            scale: t(`${T_PREFIX}.test1-scale`),
        },
        {
            name: t(`${T_PREFIX}.test2-name`),
            image: 'https://via.placeholder.com/80x110',
            imageAlt: 'placeholder',
            description: t(`${T_PREFIX}.test2-description`),
            scale: t(`${T_PREFIX}.test2-scale`),
        },
        {
            name: t(`${T_PREFIX}.test3-name`),
            image: 'https://via.placeholder.com/80x110',
            imageAlt: 'placeholder',
            description: t(`${T_PREFIX}.test3-description`),
            scale: t(`${T_PREFIX}.test3-scale`),
        },
        {
            name: t(`${T_PREFIX}.test4-name`),
            image: 'https://via.placeholder.com/80x110',
            imageAlt: 'placeholder',
            description: t(`${T_PREFIX}.test4-description`),
            scale: t(`${T_PREFIX}.test4-scale`),
        },
    ];

    return (
        <Panel title={t(`${T_PREFIX}.panelTitle`)}>
            <Typography className={classes.title}>{t(`${T_PREFIX}.title`)}</Typography>
            <Typography className={classes.text}>{t(`${T_PREFIX}.text1`)}</Typography>
            <div className={classes.tests}>
                {tests.map(({ name, image, imageAlt, description, scale }) => (
                    <Box key={name} display="flex" alignItems="flex-end">
                        <img className={classes.testImage} src={image} alt={imageAlt} />
                        <Box ml={1.25}>
                            <Typography className={classes.testName}>{name}</Typography>
                            <Typography className={classes.testText}>{description}</Typography>
                            <Typography className={classes.testText}>{scale}</Typography>
                        </Box>
                    </Box>
                ))}
            </div>
            <Typography className={classes.text}>{t(`${T_PREFIX}.text2`)}</Typography>
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
    tests: {
        display: 'grid',
        gridGap: theme.spacing(5),
        gridTemplateColumns: 'repeat(4, 1fr)',
        margin: theme.spacing(4, 0),

        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },

        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: 'repeat(1, 1fr)',
        },
    },
    testName: {
        fontSize: 15,
        fontWeight: 'bold',
        lineHeight: '18px',
        color: panelTextColor,
        textTransform: 'uppercase',
    },
    testText: {
        marginTop: theme.spacing(1.25),
        fontSize: 12,
        lineHeight: '14.4px',
        color: lightTextColor,
    },
    testImage: {
        width: 80,
        height: 110,
    },
}));
