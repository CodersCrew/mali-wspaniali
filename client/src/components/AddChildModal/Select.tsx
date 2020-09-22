import React, { FC } from 'react';
import { InputLabel, FormControl, Select as SelectField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { FieldAttributes, useField } from 'formik';

import FormHelperText from '@material-ui/core/FormHelperText';
import { useTranslation } from 'react-i18next';
import { useStyles } from './useStyles';
import { selectValues, Option } from './selectValues';

interface SelectProps {
    label: string;
}

export const Select: FC<FieldAttributes<SelectProps>> = ({ label, value, className, disabled, ...props }) => {
    const { name } = props;
    const { t } = useTranslation();
    const [field, meta] = useField<SelectProps>(props);
    const errorText = meta.error && meta.touched ? meta.error : '';

    return (
        <FormControl variant="outlined" className={className}>
            <InputLabel htmlFor={name} {...field} error={!!errorText}>
                {label}
            </InputLabel>
            <SelectField
                {...field}
                error={!!errorText}
                id="outlined-select-currency"
                label={label}
                value={value}
                name={name}
                renderValue={() => value}
                labelId={name}
                disabled={!!disabled}
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
            <FormHelperText {...field} error={!!errorText}>
                {errorText}
            </FormHelperText>
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
