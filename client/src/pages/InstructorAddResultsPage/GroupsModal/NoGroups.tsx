import { useTranslation } from 'react-i18next';

import { Box, createStyles, Grid, makeStyles, Typography, Theme } from '@material-ui/core';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

export function NoGroups() {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Grid container direction="row" justifyContent="center">
            <Grid item xs={8}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <PermIdentityIcon className={classes.icon} />
                    <Typography variant="subtitle1" align="center">
                        {t('groupsModal.no-groups')}
                    </Typography>
                    <Box mt={2} />
                    <Typography variant="body1" align="center">
                        {t('groupsModal.instruction')}
                    </Typography>
                    <Typography variant="body1" align="center">
                        {t('groupsModal.select')}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            fontSize: '60px',
            marginBottom: theme.spacing(2),
        },
    }),
);
