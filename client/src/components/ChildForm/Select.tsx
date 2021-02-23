import React from 'react';
import {
    InputLabel,
    FormControl,
    Select as SelectField,
    MenuItem,
    FormHelperText,
    makeStyles,
    createStyles,
} from '@material-ui/core';
import { Theme } from '../../theme/types';

import { Option } from './useSelectValues';

interface Props {
    label: string;
    value?: string;
    options: Option[];
    name: string;
    disabled?: boolean;
    error?: string | undefined;
    touched?: boolean;
    onChange: (name: string, value: string) => void;
}

export function Select({ label, value, options, disabled, name, error, touched, onChange }: Props) {
    const classes = useStyles();
    const errorText = error && touched ? error : '';

    return (
        <FormControl variant="outlined" fullWidth className={classes.container}>
            <InputLabel htmlFor={name} error={!!errorText}>
                {label}
            </InputLabel>
            <SelectField
                error={!!errorText}
                id={name}
                label={label}
                value={value}
                name={name}
                renderValue={() => options.find((o) => o.value === value)?.label}
                labelId={name}
                disabled={!!disabled}
                fullWidth
                onChange={({ target: { name: selectName, value: selectValue } }) => {
                    onChange(selectName as string, selectValue as string);
                }}
            >
                {options.map((option: Option) => {
                    return (
                        <MenuItem value={option.value} key={option.value}>
                            <span>{option.label}</span>
                            <span className={classes.helperLabel}>{option.helperLabel}</span>
                        </MenuItem>
                    );
                })}
            </SelectField>
            <FormHelperText error>{errorText}</FormHelperText>
        </FormControl>
    );
}

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        helperLabel: {
            color: theme.palette.grey['400'],
            marginLeft: theme.spacing(1),
        },
        container: {
            minWidth: 120,
        },
    }),
);
