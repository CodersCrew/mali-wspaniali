import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Panel } from '../Panel';
import { CircleChart } from '../../../../components/CircleChart';
import { panelTextColor, white, resultColors } from '../../../../colors';

const T_PREFIX = 'child-profile.tests-informations.results';

export const Results = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    const scores = [
        {
            label: `${t(`${T_PREFIX}.to`)} 25%`,
            value: 25,
            color: resultColors.red,
            description: t(`${T_PREFIX}.score25`),
        },
        {
            label: `${t(`${T_PREFIX}.to`)} 50%`,
            value: 50,
            color: resultColors.yellow,
            description: t(`${T_PREFIX}.score50`),
        },
        {
            label: `${t(`${T_PREFIX}.to`)} 75%`,
            value: 75,
            color: resultColors.green,
            description: t(`${T_PREFIX}.score75`),
        },
        {
            label: `${t(`${T_PREFIX}.to`)} 100%`,
            value: 100,
            color: resultColors.green,
            description: t(`${T_PREFIX}.score100`),
        },
    ];

    return (
        <Panel title={t(`${T_PREFIX}.panelTitle`)}>
            <Typography className={classes.title}>{t(`${T_PREFIX}.title`)}</Typography>
            <Typography className={classes.text}>{t(`${T_PREFIX}.text1`)}</Typography>
            <Typography className={classes.text}>{t(`${T_PREFIX}.text2`)}</Typography>
            <div className={classes.scores}>
                {scores.map(({ color, description, label, value }) => (
                    <Box key={label} display="flex" flexDirection="column" alignItems="center">
                        <CircleChart color={color} maxValue={100} value={value} label={label} enableInfoIcon />
                        <div className={classes.scoreDescription} style={{ backgroundColor: color }}>
                            {description}
                        </div>
                    </Box>
                ))}
            </div>
        </Panel>
    );
};

const useStyles = makeStyles(theme => ({
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
    image: {
        marginLeft: theme.spacing(6),
        width: 257,
        height: 141,

        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    scores: {
        display: 'grid',
        gridGap: theme.spacing(5),
        gridTemplateColumns: 'repeat(4, 1fr)',
        marginTop: theme.spacing(6),

        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },

        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: 'repeat(1, 1fr)',
        },
    },
    scoreDescription: {
        padding: theme.spacing(0.75, 1.5),
        marginTop: theme.spacing(2.5),
        borderRadius: '96px',
        fontSize: 14,
        fontWeight: 'bold',
        color: white,
        textTransform: 'uppercase',
        textAlign: 'center',
    },
}));
