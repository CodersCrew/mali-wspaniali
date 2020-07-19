import React, { useEffect, useState } from 'react';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { handleSignInWithEmailAndPassword } from '../../../../queries/authQueries';
import { AuthError, UserCredential } from '../../../../firebase/firebase';
import { getCurrentUserEmail } from '../../GetCurrentUserEmail';
import { FormControlOldPasswordPropsInterface } from './types';

export const FormControlOldPassword = (props: FormControlOldPasswordPropsInterface) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const states = { ...props.states };
    const [values, setValues] = useState(states);

    const currentUserEmail = getCurrentUserEmail();

    const handleClickShowOldPassword = () => {
        setValues({
            ...values,
            showOldPassword: !values.showOldPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleOldPasswordValid = ({ user }: UserCredential) => {
        if (user) {
            const confirmDisabled = !(
                values.validPasswordLength &&
                values.validPasswordUppercase &&
                values.validPasswordNumber &&
                values.validPasswordSymbol
            );
            const buttonDisabled = confirmDisabled || !(values.newPassword === values.confirmNewPassword);
            setValues({
                ...values,
                oldPasswordError: false,
                newPasswordDisabled: false,
                oldPasswordHelperText: ' ',
                changePasswordButtonDisabled: buttonDisabled,
            });
        }
    };

    const handleOldPasswordInvalid = (error: AuthError) => {
        setValues({
            ...values,
            oldPasswordError: true,
            newPasswordDisabled: true,
            oldPasswordHelperText: `${error.message}`,
            changePasswordButtonDisabled: true,
        });
    };

    const handleOldPasswordOnBlur = (email: string | null | undefined, password: string) => {
        if (email) {
            handleSignInWithEmailAndPassword(email, password, handleOldPasswordValid, handleOldPasswordInvalid);
        }
    };

    useEffect(() => {
        props.onChange({ states: { ...states, ...values } });
        // eslint-disable-next-line
    }, [values.newPasswordDisabled, values.oldPassword]);

    return (
        <FormControl variant="outlined" className={classes.form}>
            <InputLabel htmlFor="outlined-adornment-password" error={values.oldPasswordError}>
                {t('settings-page.old-password')}
            </InputLabel>
            <OutlinedInput
                required
                onChange={event => {
                    setValues({
                        ...values,
                        oldPassword: event.target.value,
                        newPasswordDisabled: true,
                        changePasswordButtonDisabled: true,
                    });
                }}
                value={values.oldPassword}
                id="old-password"
                label={t('settings-page.old-password')}
                type={values.showOldPassword ? 'text' : 'password'}
                error={values.oldPasswordError}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowOldPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {values.showOldPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
                inputProps={{
                    tabindex: '1',
                    onBlur: event => {
                        if (event.target.value) {
                            handleOldPasswordOnBlur(currentUserEmail, event.target.value);
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
