import React, { useEffect, useState } from 'react';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { FormControlConfirmNewPasswordPropsInterface } from './types';

export const FormControlConfirmNewPassword = (props: FormControlConfirmNewPasswordPropsInterface) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const states = { ...props.states };
    const [values, setValues] = useState(states);
    const validateConfirmNewPassword = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const password = event.target.value;
        if (values.newPassword === password) {
            setValues({ ...values, confirmNewPassword: password, changePasswordButtonDisabled: false });
        } else {
            setValues({ ...values, confirmNewPassword: password, changePasswordButtonDisabled: true });
        }
    };

    const handleClickShowConfirmNewPassword = () => {
        setValues({
            ...values,
            showConfirmNewPassword: !values.showConfirmNewPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    useEffect(() => {
        props.onChange({ states: { ...states, ...values } });
        // eslint-disable-next-line
    }, [values.confirmNewPasswordDisabled, values.confirmNewPassword]);

    return (
        <FormControl variant="outlined" className={classes.form}>
            <InputLabel htmlFor="outlined-adornment-password">{t('settings-page.confirm-new-password')}</InputLabel>
            <OutlinedInput
                required
                disabled={values.confirmNewPasswordDisabled}
                onChange={event => validateConfirmNewPassword(event)}
                value={values.confirmNewPassword}
                id="confirm-new-password"
                label={t('settings-page.confirm-new-password')}
                type={values.showConfirmNewPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            disabled={values.confirmNewPasswordDisabled}
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmNewPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {values.showConfirmNewPassword ? <Visibility /> : <VisibilityOff />}
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
