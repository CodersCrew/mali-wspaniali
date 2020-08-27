import React, { Dispatch } from 'react';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { CHANGE_CONFIRM_PASSWORD, TOGGLE_CONFIRM_PASSWORD_VISIBILITY } from '../ChangePasswordPanelReducer';
import { ChangePasswordPanelStateInterface } from './types';

interface Props {
    state: ChangePasswordPanelStateInterface;
    dispatch: Dispatch<{ type: string; payload?: { [p: string]: string | boolean } | undefined }>;
}

export const FormControlConfirmNewPassword = (props: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <FormControl variant="outlined" className={classes.form}>
            <InputLabel htmlFor="outlined-adornment-password">{t('settings-page.confirm-new-password')}</InputLabel>
            <OutlinedInput
                required
                fullWidth
                disabled={props.state.confirmNewPasswordDisabled}
                value={props.state.confirmNewPassword}
                id="confirm-new-password"
                label={t('settings-page.confirm-new-password')}
                type={props.state.showConfirmNewPassword ? 'text' : 'password'}
                onChange={event =>
                    props.dispatch({ type: CHANGE_CONFIRM_PASSWORD, payload: { value: event.target.value } })
                }
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            disabled={props.state.confirmNewPasswordDisabled}
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={() => {
                                props.dispatch({ type: TOGGLE_CONFIRM_PASSWORD_VISIBILITY });
                            }}
                        >
                            {props.state.showConfirmNewPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
                inputProps={{
                    tabindex: '3',
                }}
            />
        </FormControl>
    );
};

const useStyles = makeStyles({
    form: {
        display: 'block',
        marginBottom: '15px',
    },
});
