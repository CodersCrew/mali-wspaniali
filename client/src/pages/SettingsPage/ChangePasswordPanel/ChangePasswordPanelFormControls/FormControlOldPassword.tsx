import React, { Dispatch } from 'react';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useMutation } from '@apollo/client';
import {
    CHANGE_OLD_PASSWORD,
    EMAIL_IS_CORRECT,
    TOGGLE_OLD_PASSWORD_VISIBILITY,
    UPDATE_HELPER_TEXT,
} from '../ChangePasswordPanelReducer';
import { AUTHORIZE_USER } from '../../../../graphql/userRepository';
import { Me } from '../../../../graphql/types';
import { openAlertDialog } from '../../../../components/AlertDialog';
import { ChangePasswordPanelStateInterface } from './types';

interface Props {
    state: ChangePasswordPanelStateInterface;
    dispatch: Dispatch<{ type: string; payload?: { [p: string]: string | boolean } | undefined }>;
    user: Me;
}

export const FormControlOldPassword = (props: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [authorizeUser] = useMutation(AUTHORIZE_USER);

    const handleOldPasswordOnBlur = (password: string) => {
        (() => {
            authorizeUser({
                variables: { user: { mail: props.user.mail, password } },
            })
                .then(() => {
                    props.dispatch({ type: EMAIL_IS_CORRECT });
                })
                .catch(err => passwordIsNotCorrect(err.message));
        })();

        const passwordIsNotCorrect = (err: string) => {
            const helperText = () => {
                if (err === 'Wrong mail or password') {
                    return t('settings-page.wrong-old-password');
                }
                openAlertDialog({
                    type: 'error',
                    description: `${t('settings-page.wrong-old-password-error')}: ${err}`,
                });

                return t('settings-page.wrong-old-password-error');
            };
            props.dispatch({ type: UPDATE_HELPER_TEXT, payload: { value: helperText() } });
        };
    };

    return (
        <FormControl variant="outlined" className={classes.form}>
            <InputLabel htmlFor="outlined-adornment-password" error={props.state.oldPasswordError}>
                {t('settings-page.old-password')}
            </InputLabel>
            <OutlinedInput
                required
                fullWidth
                id="old-password"
                label={t('settings-page.old-password')}
                type={props.state.showOldPassword ? 'text' : 'password'}
                value={props.state.oldPassword}
                error={props.state.oldPasswordError}
                onChange={event =>
                    props.dispatch({ type: CHANGE_OLD_PASSWORD, payload: { value: event.target.value } })
                }
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={() => props.dispatch({ type: TOGGLE_OLD_PASSWORD_VISIBILITY })}
                        >
                            {props.state.showOldPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
                inputProps={{
                    tabindex: '1',
                    onBlur: event => {
                        if (event.target.value) {
                            handleOldPasswordOnBlur(event.target.value);
                        }
                    },
                }}
            />
            <FormHelperText error={props.state.oldPasswordError}>
                {props.state.oldPasswordHelperText ? props.state.oldPasswordHelperText : ''}
            </FormHelperText>
        </FormControl>
    );
};

const useStyles = makeStyles({
    form: {
        display: 'block',
        marginBottom: '15px',
        width: '100%',
    },
});
