import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useMutation } from '@apollo/client';
import { Props } from './interfaces';
import {
    CHANGE_OLD_PASSWORD,
    TOGGLE_OLD_PASSWORD_VISIBILITY,
    UPDATE_HELPER_TEXT,
    EMAIL_IS_CORRECT,
} from '../ChangePasswordPanelReducer';
import { Me } from '../../../../graphql/types';
import { openAlertDialog } from '../../../../components/AlertDialog';
import { AUTHORIZE_USER } from '../../../../operations/mutations/User/autthorizeMe';

interface FormProps extends Props {
    user: Me | null;
}

export const FormControlOldPassword = (props: FormProps) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { state, dispatch, user } = props;
    const { oldPassword, oldPasswordError, oldPasswordHelperText, showOldPassword } = state;
    const [authorizeUser] = useMutation(AUTHORIZE_USER);

    const handleBlur = (password: string) => {
        (() => {
            if (user) {
                authorizeUser({
                    variables: {
                        user: { mail: user.mail, password },
                    },
                })
                    .then(() => {
                        dispatch({ type: EMAIL_IS_CORRECT });
                    })
                    .catch(error => {
                        handleIncorrectPassword(error.message);
                    });
            }
        })();
        const handleIncorrectPassword = (error: string) => {
            const helperText = () => {
                if (error === 'Wrong mail or password') {
                    return t('settings-page.wrong-old-password');
                }
                openAlertDialog({
                    type: 'error',
                    description: `${t('settings-page.wrong-old-password')}: ${error}`,
                });

                return t('settings-page.wrong-old-password-error');
            };
            dispatch({ type: UPDATE_HELPER_TEXT, payload: { value: helperText() } });
        };
    };

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
                    onBlur: event => {
                        if (event.target.value) {
                            handleBlur(event.target.value);
                        }
                    },
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
