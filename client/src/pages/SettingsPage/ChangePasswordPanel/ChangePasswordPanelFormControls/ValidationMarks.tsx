import React from 'react';
import { InputAdornment, InputBase } from '@material-ui/core';
import { CheckCircle, HighlightOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { ValidationMarksPropsInterface } from './types';

export const ValidationMarks = (props: ValidationMarksPropsInterface) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const values = { ...props.states };

    return (
        <div className={classes.checkboxWrapper}>
            <InputBase
                disabled={values.newPasswordDisabled}
                className={classes.margin}
                value={t('settings-page.valid-password.min-length')}
                startAdornment={
                    <InputAdornment position="start">
                        {!values.validPasswordLength && <HighlightOff className={classes.adornment} />}
                        {values.validPasswordLength && <CheckCircle className={classes.adornment} />}
                    </InputAdornment>
                }
            />
            <InputBase
                disabled={values.newPasswordDisabled}
                className={classes.margin}
                value={t('settings-page.valid-password.uppercase-letter')}
                startAdornment={
                    <InputAdornment position="start">
                        {!values.validPasswordUppercase && <HighlightOff className={classes.adornment} />}
                        {values.validPasswordUppercase && <CheckCircle className={classes.adornment} />}
                    </InputAdornment>
                }
            />
            <InputBase
                disabled={values.newPasswordDisabled}
                className={classes.margin}
                value={t('settings-page.valid-password.number')}
                startAdornment={
                    <InputAdornment position="start">
                        {!values.validPasswordNumber && <HighlightOff className={classes.adornment} />}
                        {values.validPasswordNumber && <CheckCircle className={classes.adornment} />}
                    </InputAdornment>
                }
            />
            <InputBase
                disabled={values.newPasswordDisabled}
                className={classes.margin}
                value={t('settings-page.valid-password.symbol')}
                startAdornment={
                    <InputAdornment position="start">
                        {!values.validPasswordSymbol && <HighlightOff className={classes.adornment} />}
                        {values.validPasswordSymbol && <CheckCircle className={classes.adornment} />}
                    </InputAdornment>
                }
            />
        </div>
    );
};

const useStyles = makeStyles({
    checkboxWrapper: {
        marginBottom: '15px',
        width: '50%',
    },
    adornment: {
        fontSize: '1rem',
    },
    margin: {
        fontSize: '0.75rem',
        paddingLeft: '14px',
        width: '35%',
    },
});
