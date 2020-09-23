import React, { ChangeEvent, ReactNode } from 'react';
import { InputLabel, FormControl, Select as SelectField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

import FormHelperText from '@material-ui/core/FormHelperText';
import { useTranslation } from 'react-i18next';
import { useStyles } from './useStyles';
import { selectValues, Option } from './selectValues';

interface SelectProps {
    label: string;
    value: string;
    name: string;
    disabled?: boolean;
    className: string;
    error: string | undefined;
    touched: any;
    onChange: (event: ChangeEvent<{ name?: string | undefined; value: unknown }>, child: ReactNode) => void;
}

export const Select = ({ label, value, className, disabled, name, error, touched, onChange }: SelectProps) => {
    const { t } = useTranslation();
    const errorText = error && touched ? error : '';

    return (
        <FormControl variant="outlined" className={className}>
            <InputLabel htmlFor={name} error={!!errorText}>
                {label}
            </InputLabel>
            <SelectField
                error={!!errorText}
                id="outlined-select-currency"
                label={label}
                value={value}
                name={name}
                renderValue={() => value}
                labelId={name}
                disabled={!!disabled}
                onChange={onChange}
            >
                {selectValues[name].map((option: Option, i: number) => {
                    const path = `add-child-modal.select-options.${name}.option-label-${i + 1}`;
                    const optionLabel = t(path) !== path ? t(path) : option.label;
                    const helperLabelPath = `add-child-modal.select-options.${name}.helper-label-${i + 1}`;
                    const helperLabel =
                        t(helperLabelPath) !== helperLabelPath && option.helperLabel ? t(helperLabelPath) : '';

                    return (
                        <MenuItem value={optionLabel} key={optionLabel}>
                            <OptionField info={helperLabel} label={optionLabel} />
                        </MenuItem>
                    );
                })}
            </SelectField>
            <FormHelperText error={!!errorText}>{errorText}</FormHelperText>
        </FormControl>
    );
};

interface OptionProps {
    info: string;
    label: string;
}

function OptionField(props: OptionProps) {
    const classes = useStyles();

    return (
        <>
            <span>{props.label}</span>
            <span className={classes.helperLabel}>{props.info}</span>
        </>
    );
}
