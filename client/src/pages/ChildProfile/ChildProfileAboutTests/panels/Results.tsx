import { useTranslation } from 'react-i18next';
import { makeStyles, Typography } from '@material-ui/core';

import { Panel } from '../Panel';

const T_PREFIX = 'child-profile.tests-informations.results';

export const Results = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Panel title={t(`${T_PREFIX}.panelTitle`)}>
            <Typography color="textPrimary" variant="h4">
                {t(`${T_PREFIX}.title`)}
            </Typography>
            {[...Array(4)].map((_, index) => (
                <Typography key={index} variant="body1" color="textPrimary" className={classes.text}>
                    {t(`${T_PREFIX}.text${index + 1}`)}
                </Typography>
            ))}
        </Panel>
    );
};

const useStyles = makeStyles((theme) => ({
    text: {
        marginTop: theme.spacing(2),
    },
}));
