import React, { useEffect, useState } from 'react';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import {
    validatePasswordLength,
    validatePasswordNumber,
    validatePasswordSymbol,
    validatePasswordUppercase,
} from '../ValidatePassword';
import { FormControlNewPasswordPropsInterface } from './types';

export const FormControlNewPassword = (props: FormControlNewPasswordPropsInterface) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const states = { ...props.states };
    const [values, setValues] = useState(states);

    const handleClickShowNewPassword = () => {
        setValues({
            ...values,
            showNewPassword: !values.showNewPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const validateNewPassword = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const password = event.target.value;
        const validLength = validatePasswordLength(password);
        const validUppercase = validatePasswordUppercase(password);
        const validNumber = validatePasswordNumber(password);
        const validSymbol = validatePasswordSymbol(password);
        const confirmDisabled = !(validLength && validUppercase && validNumber && validSymbol);
        const buttonDisabled = confirmDisabled || !(password === values.confirmNewPassword);
        setValues({
            ...values,
            changePasswordButtonDisabled: buttonDisabled,
            confirmNewPasswordDisabled: confirmDisabled,
            newPassword: password,
            validPasswordLength: validLength,
            validPasswordUppercase: validUppercase,
            validPasswordNumber: validNumber,
            validPasswordSymbol: validSymbol,
        });
    };

    useEffect(() => {
        props.onChange({ states: { ...values } });
        // eslint-disable-next-line
    }, [values.newPasswordDisabled, values.newPassword]);

    return (
        <FormControl variant="outlined" className={classes.form}>
            <InputLabel htmlFor="outlined-adornment-password">{t('settings-page.new-password')}</InputLabel>
            <OutlinedInput
                required
                fullWidth
                disabled={values.newPasswordDisabled}
                onChange={event => validateNewPassword(event)}
                value={values.newPassword}
                id="new-password"
                label={t('settings-page.new-password')}
                type={values.showNewPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            disabled={values.newPasswordDisabled}
                            aria-label="toggle password visibility"
                            onClick={handleClickShowNewPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {values.showNewPassword ? <Visibility /> : <VisibilityOff />}
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
