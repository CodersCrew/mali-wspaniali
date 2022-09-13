import { useTranslation } from 'react-i18next';
import { makeStyles, Box, Typography } from '@material-ui/core';

import { Panel } from '../Panel';
import ConditionsImage1 from '@app/assets/testInformation/Conditions/testInformationConditions1.png';
import ConditionsImage2 from '@app/assets/testInformation/Conditions/testInformationConditions2.png';
import ConditionsImage3 from '@app/assets/testInformation/Conditions/testInformationConditions3.png';
import ConditionsImage4 from '@app/assets/testInformation/Conditions/testInformationConditions4.png';

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
            <Typography variant="h4" color="textPrimary">
                {t(`${T_PREFIX}.title`)}
            </Typography>
            <Typography variant="body1" className={classes.text}>
                {t(`${T_PREFIX}.text1`)}
            </Typography>
            <div className={classes.tests}>
                {tests.map(({ name, image, imageAlt, description }) => (
                    <Box key={name} display="grid" className={classes.test}>
                        <Box className={classes.testImageContainer}>
                            <img className={classes.image} src={image} alt={imageAlt} />
                        </Box>
                        <Box>
                            <Typography className={classes.testName} variant="subtitle2">
                                {name}
                            </Typography>
                            <Typography variant="body2" className={classes.text}>
                                {description}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </div>
            <Typography variant="body1" className={classes.text}>
                {t(`${T_PREFIX}.text2`)}
            </Typography>
            <Typography variant="body1" className={classes.text}>
                {t(`${T_PREFIX}.text3`)}
            </Typography>
        </Panel>
    );
};

const useStyles = makeStyles((theme) => ({
    text: {
        marginTop: theme.spacing(2),
    },
    test: { gridTemplateRows: 'repeat(2, 0.5fr)' },
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
        marginTop: theme.spacing(5),
        textTransform: 'uppercase',
    },
    testImageContainer: {
        height: 152,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        marginTop: 'auto',
    },
}));
