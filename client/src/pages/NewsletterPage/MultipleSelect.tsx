import React from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, FormControl, InputLabel, Select, Checkbox, ListItemText, FormHelperText } from '@material-ui/core';

interface Props {
    stateData: string[];
    optionsValues: {
        value: string;
        label: string;
    }[];
    onChange: (name: string, value: string[]) => void;
    onBlur: (e: FocusEvent<HTMLInputElement>) => void;
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
    onChange,
    onBlur,
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
                onChange={({ target: { name: selectName, value } }) => {
                    onChange(selectName as string, value as string[]);
                }}
                onBlur={onBlur}
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
                {optionsValues.map((item) => {
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
