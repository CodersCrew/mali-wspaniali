import React, { useReducer } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useBreakpoints } from '../../../queries/useBreakpoints';
import { FormControlOldPassword } from './ChangepasswordPanelFormControls/FormControlOldPassword';
import { ChangePasswordPanelReducer, ChangePasswordPanelInitialState } from './ChangePasswordPanelReducer';
import { useMe } from '../../../utils/useMe';
import { ButtonResetOldPassword } from './ChangepasswordPanelFormControls/ButtonResetOldPassword';

export function ChangePasswordPanel() {
    const device = useBreakpoints();
    const classes = useStyles();
    const { t } = useTranslation();
    const [state, dispatch] = useReducer(ChangePasswordPanelReducer, ChangePasswordPanelInitialState);
    const user = useMe();

    return (
        <Grid
            container
            direction={device === 'MOBILE' ? 'column' : 'row'}
            justify="space-between"
            className={classes.container}
        >
            <Grid item className={device === 'MOBILE' ? classes.gridItemMobile : classes.gridItem}>
                <FormControlOldPassword state={state} dispatch={dispatch} />
                <ButtonResetOldPassword state={state} dispatch={dispatch} user={user} />
            </Grid>
            <Grid item className={device === 'MOBILE' ? classes.gridItemMobile : classes.gridItem}>
                <Typography variant={'subtitle2'} className={classes.problems}>
                    {t('settings-page.change-password-problems')}
                </Typography>
                <Typography variant={'body2'} className={classes.problems}>
                    {t('settings-page.change-password-problems-hint')}
                </Typography>
                {/* // TODO: wykorzystać wywołanie formularza kontaktowego (może z "usuwania konta"?) */}
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {},
        gridItem: { minWidth: '448px' },
        gridItemMobile: {},
        problems: {
            marginBottom: theme.spacing(2),
        },
    }),
);
