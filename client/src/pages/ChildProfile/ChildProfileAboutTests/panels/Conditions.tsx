import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, Box, Typography } from '@material-ui/core';
import { Panel } from '../Panel';
import { panelTextColor } from '../../../../colors';
import ConditionsImage1 from '../../../../assets/testInformation/Conditions/testInformationConditions1.png';
import ConditionsImage2 from '../../../../assets/testInformation/Conditions/testInformationConditions2.png';
import ConditionsImage3 from '../../../../assets/testInformation/Conditions/testInformationConditions3.png';
import ConditionsImage4 from '../../../../assets/testInformation/Conditions/testInformationConditions4.png';

const T_PREFIX = 'child-profile.tests-informations.conditions';

export const Conditions = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    const tests = [
        {
            name: t(`${T_PREFIX}.test1-name`),
            image: ConditionsImage1,
            imageAlt: 'ConditionsImage1',
            description: t(`${T_PREFIX}.test1-description`),
        },
        {
            name: t(`${T_PREFIX}.test2-name`),
            image: ConditionsImage2,
            imageAlt: 'ConditionsImage2',
            description: t(`${T_PREFIX}.test2-description`),
        },
        {
            name: t(`${T_PREFIX}.test3-name`),
            image: ConditionsImage3,
            imageAlt: 'ConditionsImage3',
            description: t(`${T_PREFIX}.test3-description`),
        },
        {
            name: t(`${T_PREFIX}.test4-name`),
            image: ConditionsImage4,
            imageAlt: 'ConditionsImage4',
            description: t(`${T_PREFIX}.test4-description`),
        },
    ];

    return (
        <Panel title={t(`${T_PREFIX}.panelTitle`)}>
            <Typography className={classes.title}>{t(`${T_PREFIX}.title`)}</Typography>
            <Typography className={classes.text}>{t(`${T_PREFIX}.text1`)}</Typography>
            <div className={classes.tests}>
                {tests.map(({ name, image, imageAlt, description }) => (
                    <Box key={name} display="grid">
                        <Box className={classes.testImageContainer}>
                            <img src={image} alt={imageAlt} />
                        </Box>
                        <Box>
                            <Typography className={classes.testName}>{name}</Typography>
                            <Typography className={classes.text}>{description}</Typography>
                        </Box>
                    </Box>
                ))}
            </div>
            <Typography className={classes.text}>{t(`${T_PREFIX}.text2`)}</Typography>
            <Typography className={classes.text}>{t(`${T_PREFIX}.text3`)}</Typography>
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
        width: '80%',
        display: 'grid',
        gridGap: theme.spacing(1.5),
        gridTemplateColumns: 'repeat(4, 1fr)',
        margin: theme.spacing(4, 'auto'),

        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },

        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: 'repeat(1, 1fr)',
        },
    },
    testName: {
        marginTop: theme.spacing(1.5),
        fontSize: 14,
        fontWeight: 500,
        lineHeight: '18px',
        color: panelTextColor,
        textTransform: 'uppercase',
    },
    testImageContainer: {
        height: 152,
        textAlign: 'center',
    },
}));
