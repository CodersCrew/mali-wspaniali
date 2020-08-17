import React, { useEffect, useState } from 'react';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';
import { FormControlOldPasswordStatesInterface } from './types';
import { AUTHORIZE_USER } from '../../../../graphql/userRepository';
import { openAlertDialog } from '../../../../components/AlertDialog';

export interface Props extends FormControlOldPasswordStatesInterface {
    email: string;
    onChange: (states: FormControlOldPasswordStatesInterface) => void;
    onToggleVisibility: () => void;
    onOldPasswordChange: (password: string, isSuccess: boolean) => void;
    visibility: boolean;
}

export const FormControlOldPassword = (props: Props) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const states = { ...props.states };
    const [values, setValues] = useState(states);
    const [authorizeUser] = useMutation(AUTHORIZE_USER);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleOldPasswordOnBlur = (password: string) => {
        (() => {
            authorizeUser({
                variables: { user: { mail: props.email, password } },
            })
                .then(() => props.onOldPasswordChange(password, true))
                .catch(err => passwordIsNotCorrect(err.message));
        })();
        // const passwordIsCorrect = () => {
        //     const confirmDisabled = !(
        //         values.validPasswordLength &&
        //         values.validPasswordUppercase &&
        //         values.validPasswordNumber &&
        //         values.validPasswordSymbol
        //     );
        //     const buttonDisabled = confirmDisabled || !(values.newPassword === values.confirmNewPassword);
        //     setValues({
        //         ...values,
        //         oldPasswordError: false,
        //         newPasswordDisabled: false,
        //         oldPasswordHelperText: ' ',
        //         changePasswordButtonDisabled: buttonDisabled,
        //     });
        // };
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
            setValues({
                ...values,
                oldPasswordError: true,
                newPasswordDisabled: true,
                oldPasswordHelperText: helperText(),
                changePasswordButtonDisabled: true,
            });
        };
    };

    useEffect(() => {
        props.onChange({ states: { ...states, ...values } });
        // eslint-disable-next-line
    }, [values.oldPassword]);

    return (
        <FormControl variant="outlined" className={classes.form}>
            <InputLabel htmlFor="outlined-adornment-password" error={values.oldPasswordError}>
                {t('settings-page.old-password')}
            </InputLabel>
            <OutlinedInput
                required
                fullWidth
                onChange={event => {
                    props.onOldPasswordChange(event.target.value, false);
                    setValues({
                        ...values,
                        oldPassword: event.target.value,
                        changePasswordButtonDisabled: true,
                    });
                }}
                value={values.oldPassword}
                id="old-password"
                label={t('settings-page.old-password')}
                type={props.visibility ? 'text' : 'password'}
                error={values.oldPasswordError}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={props.onToggleVisibility}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {props.visibility ? <Visibility /> : <VisibilityOff />}
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
            <FormHelperText error={values.oldPasswordError}>
                {values.oldPasswordHelperText ? values.oldPasswordHelperText : ''}
            </FormHelperText>
        </FormControl>
    );
};

const useStyles = makeStyles({
    form: {
        display: 'block',
        marginBottom: '15px',
    },
});
