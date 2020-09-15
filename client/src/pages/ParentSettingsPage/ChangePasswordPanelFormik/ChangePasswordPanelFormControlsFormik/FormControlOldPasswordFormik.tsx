import React from 'react';
import { FormControl, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

interface Props {
    name: string;
    value: string;
    oldPasswordError: boolean;
}

export const FormControlOldPasswordFormik = ({ name, value, oldPasswordError }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <FormControl variant="outlined" className={classes.form}>
            <InputLabel htmlFor="outlined-adornment-password" error={oldPasswordError}>
                {t('settings-page.old-password')}
            </InputLabel>
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
