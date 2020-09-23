import React, { ChangeEvent, FocusEvent, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, FormControl, InputLabel, Select, Checkbox, ListItemText, FormHelperText } from '@material-ui/core';
import { ChangeValue } from './types';

interface Props {
    stateData: string[];
    optionsValues: {
        value: string;
        label: string;
    }[];
    handleChange: (e: ChangeEvent<ChangeValue>) => void;
    handleBlur: (e: FocusEvent<HTMLInputElement>) => void;
    id: string;
    label: string;
    name: string;
    disabled?: boolean;
    renderValue: (value: unknown) => ReactNode;
    error?: string | string[];
    touched?: boolean;
}

export const MultipleSelect = ({
    stateData,
    optionsValues,
    handleChange,
    handleBlur,
    id,
    label,
    name,
    disabled,
    renderValue,
    error,
    touched,
}: Props) => {
    const { t } = useTranslation();

    return (
        <FormControl variant="outlined" fullWidth error={touched && !!error}>
            <InputLabel id={id}>{label}</InputLabel>
            <Select
                labelId={id}
                label={label}
                name={name}
                disabled={disabled}
                value={stateData || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                multiple
                renderValue={renderValue}
                MenuProps={{
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    },
                    transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                }}
                error={touched && !!error}
            >
                {optionsValues.map(item => {
                    const { value, label: selectLabel } = item;

                    return (
                        <MenuItem key={value} value={value}>
                            <Checkbox checked={stateData.includes(value)} color="primary" />
                            <ListItemText primary={selectLabel} />
                        </MenuItem>
                    );
                })}
            </Select>
            {touched && error && <FormHelperText>{t(error)}</FormHelperText>}
        </FormControl>
    );
};
