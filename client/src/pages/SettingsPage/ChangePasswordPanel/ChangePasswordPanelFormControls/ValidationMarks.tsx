import React, { useEffect } from 'react';
import { InputAdornment, InputBase } from '@material-ui/core';
import { CheckCircle, CheckCircleOutline } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

export interface ValidationMarksStatesInterface {
    states: {
        newPasswordDisabled: boolean;
        validPasswordLength: boolean;
        validPasswordNumber: boolean;
        validPasswordSymbol: boolean;
        validPasswordUppercase: boolean;
    };
}

export interface ValidationMarksPropsInterface extends ValidationMarksStatesInterface {
    onChange: (states: ValidationMarksStatesInterface) => void;
}

const T_PREFIX = 'settings-page.valid-password';

export const ValidationMarks = (props: ValidationMarksPropsInterface) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const values = { ...props.states };

    const validPassword = {
        'min-length': values.validPasswordLength,
        'uppercase-letter': values.validPasswordUppercase,
        number: values.validPasswordNumber,
        symbol: values.validPasswordSymbol,
    };

    useEffect(() => {
        props.onChange({ states: { ...values } });
        // eslint-disable-next-line
    }, [
        values.validPasswordSymbol,
        values.validPasswordNumber,
        values.validPasswordUppercase,
        values.validPasswordLength,
    ]);

    return (
        <div className={classes.marksWrapper}>
            {Object.entries(validPassword).map(([condition, isMet]) => (
                <InputBase
                    key={condition}
                    disabled={values.newPasswordDisabled}
                    className={classes.margin}
                    value={t(`${T_PREFIX}.${condition}`)}
                    startAdornment={
                        <InputAdornment position="start">
                            {isMet ? (
                                <CheckCircle className={classes.adornment} />
                            ) : (
                                <CheckCircleOutline className={classes.adornment} />
                            )}
                        </InputAdornment>
                    }
                />
            ))}
        </div>
    );
};

const useStyles = makeStyles({
    marksWrapper: {
        marginBottom: '15px',
    },
    adornment: {
        fontSize: '1rem',
    },
    margin: {
        fontSize: '0.75rem',
        paddingLeft: '14px',
    },
});
