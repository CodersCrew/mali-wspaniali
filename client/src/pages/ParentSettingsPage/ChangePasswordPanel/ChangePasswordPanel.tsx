import React, { useReducer } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Me } from '../../../graphql/types';
import { validateNewPassword } from './ChangePasswordPanelFormControls';
import { ChangePasswordPanelInitialState, ChangePasswordPanelReducer } from './ChangePasswordPanelReducer';
import { PasswordStrengthChips } from '../../RegistrationPage/RegistrationForm/PasswordStrengthChips';
import { ButtonSecondary } from '../../../components/Button';
import { FormControlNewPassword } from './ChangePasswordPanelFormControls/FormControlNewPassword';
import { FormControlOldPassword } from './ChangePasswordPanelFormControls/FormControlOldPassword';
import { FormControlConfirmNewPassword } from './ChangePasswordPanelFormControls/FormControlConfirmNewPassword';

interface Props {
    user: Me;
}

export const ChangePasswordPanel = (props: Props) => {
    const [state, dispatch] = useReducer(ChangePasswordPanelReducer, ChangePasswordPanelInitialState);
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Grid container>
            <Grid container item xs={12} spacing={10}>
                <Grid item xs={6}>
                    <FormControlOldPassword state={state} dispatch={dispatch} user={props.user} />
                    <FormControlNewPassword state={state} dispatch={dispatch} />
                    <div className={classes.marksWrapper}>
                        <PasswordStrengthChips passwordValidation={validateNewPassword(state.newPassword)} />
                    </div>
                    <FormControlConfirmNewPassword state={state} dispatch={dispatch} />
                    <div className={classes.submitWrapper}>
                        <ButtonSecondary
                            type="submit"
                            variant="contained"
                            disabled={state.changePasswordButtonDisabled}
                            className={classes.changePasswordButton}
                        >
                            {t('settings-page.change-password')}
                        </ButtonSecondary>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant={'subtitle2'} className={classes.problems}>
                        {t('settings-page.change-password-problems')}
                    </Typography>
                    <Typography variant={'body2'} className={classes.problems}>
                        {t('settings-page.change-password-problems-hint')}
                    </Typography>
                    <ButtonSecondary variant={'contained'} className={classes.problems}>
                        <Typography variant={'button'}>
                            {t('settings-page.parent.delete-account.deletion-button')}
                        </Typography>
                    </ButtonSecondary>
                </Grid>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        marksWrapper: {
            marginBottom: theme.spacing(2),
        },
        problems: {
            marginBottom: theme.spacing(2),
        },
        submitWrapper: {
            [theme.breakpoints.down('sm')]: {
                marginBottom: theme.spacing(2) * 1.25,
            },
        },
        changePasswordButton: {
            float: 'inline-end',
        },
    }),
);
