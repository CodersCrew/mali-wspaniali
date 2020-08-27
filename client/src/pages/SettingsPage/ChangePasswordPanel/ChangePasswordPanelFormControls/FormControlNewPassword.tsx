import React, { Dispatch } from 'react';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { CHANGE_NEW_PASSWORD, TOGGLE_NEW_PASSWORD_VISIBILITY } from '../ChangePasswordPanelReducer';
import { ChangePasswordPanelStateInterface } from './types';

interface Props {
    state: ChangePasswordPanelStateInterface;
    dispatch: Dispatch<{ type: string; payload?: { [p: string]: string | boolean } | undefined }>;
}

export const FormControlNewPassword = (props: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <FormControl variant="outlined" className={classes.form}>
            <InputLabel htmlFor="outlined-adornment-password">{t('settings-page.new-password')}</InputLabel>
            <OutlinedInput
                required
                fullWidth
                disabled={props.state.newPasswordDisabled}
                value={props.state.newPassword}
                label={t('settings-page.new-password')}
                type={props.state.showNewPassword ? 'text' : 'password'}
                onChange={event =>
                    props.dispatch({ type: CHANGE_NEW_PASSWORD, payload: { value: event.target.value } })
                }
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            disabled={props.state.newPasswordDisabled}
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={() => {
                                props.dispatch({ type: TOGGLE_NEW_PASSWORD_VISIBILITY });
                            }}
                        >
                            {props.state.showNewPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
                inputProps={{
                    tabindex: '2',
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
