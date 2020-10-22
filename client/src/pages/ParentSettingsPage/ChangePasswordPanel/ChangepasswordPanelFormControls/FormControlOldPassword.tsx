import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import {
    ChangePasswordPanelComponentsProps,
    CHANGE_OLD_PASSWORD,
    TOGGLE_OLD_PASSWORD_VISIBILITY,
} from '../ChangePasswordPanelReducer';

// TODO: żeby ENTER naciśnięty na polu formularza robił to samo, co kliknięcie BUTTON - wykonywał reset hasla
export const FormControlOldPassword = (props: ChangePasswordPanelComponentsProps) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { state, dispatch } = props;
    const { oldPassword, oldPasswordDisabled, oldPasswordError, oldPasswordHelperText, showOldPassword } = state;

    return (
        <FormControl variant="outlined" className={classes.form}>
            <InputLabel htmlFor="old-password">{t('settings-page.old-password')}</InputLabel>
            <OutlinedInput
                required
                fullWidth
                id="old-password"
                label={t('settings-page.old-password')}
                type={showOldPassword ? 'text' : 'password'}
                value={oldPassword}
                error={oldPasswordError}
                disabled={oldPasswordDisabled}
                onChange={event => dispatch({ type: CHANGE_OLD_PASSWORD, payload: { value: event.target.value } })}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={() => dispatch({ type: TOGGLE_OLD_PASSWORD_VISIBILITY })}
                        >
                            {showOldPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
                inputProps={{
                    tabIndex: 1,
                }}
            />
            <FormHelperText error={oldPasswordError}>{oldPasswordHelperText || ''}</FormHelperText>
        </FormControl>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: { display: 'block', marginBottom: '15px', width: '100%' },
    }),
);
