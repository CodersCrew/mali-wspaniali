import React from 'react';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { ChangePasswordPanelFormikProps } from './interfaces';

export const FormControlOldPasswordFormik = ({
    value,
    onChange,
    onBlur,
    show,
    toggle,
    error,
    helperText,
}: ChangePasswordPanelFormikProps) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <FormControl variant="outlined" className={classes.form}>
            {/* <InputLabel htmlFor="outlined-adornment-password">{t('settings-page.old-password')}</InputLabel> */}
            <InputLabel htmlFor="old-password" error={error}>
                {t('settings-page.old-password')}
            </InputLabel>
            <OutlinedInput
                required
                fullWidth
                autoComplete="off"
                label={t('settings-page.old-password')}
                type={show ? 'text' : 'password'}
                id="old-password"
                name="oldPassword"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={error}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" edge="end" onClick={toggle}>
                            {show ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            <FormHelperText error={error}>{helperText || ''}</FormHelperText>
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
