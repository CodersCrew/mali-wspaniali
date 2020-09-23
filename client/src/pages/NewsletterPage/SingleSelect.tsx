import React, { FocusEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, FormControl, InputLabel, Select, FormHelperText } from '@material-ui/core';

interface Props {
    stateData: string;
    optionsValues: {
        value: string;
        label: string;
    }[];
    onChange: (name: string, value: string) => void;
    onBlur: (e: FocusEvent<HTMLInputElement>) => void;
    id: string;
    label: string;
    name: string;
    disabled?: boolean;
    error?: string;
    touched?: boolean;
}

export const SingleSelect = ({
    stateData,
    optionsValues,
    onChange,
    onBlur,
    id,
    label,
    name,
    disabled,
    error,
    touched,
}: Props) => {
    const { t } = useTranslation();

    return (
        <FormControl variant="outlined" fullWidth error={touched && !!error}>
            <InputLabel id={id}>{label}</InputLabel>
            <Select
                labelId={id}
                label={`${label} ${error}`}
                name={name}
                disabled={disabled}
                value={stateData || ''}
                onChange={({ target: { name: selectName, value } }) => {
                    onChange(selectName as string, value as string);
                }}
                onBlur={onBlur}
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
                            {t(selectLabel)}
                        </MenuItem>
                    );
                })}
            </Select>
            {touched && error && <FormHelperText>{t(error)}</FormHelperText>}
        </FormControl>
    );
};
