import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    FormHelperText,
    InputLabelProps,
    SelectProps,
} from '@material-ui/core';

type SingleSelectProps = {
    stateData: {
        value: string;
        error: boolean;
    };
    optionsValues: {
        value: string;
        label: string;
    }[];
    handleChange: (e: ChangeEvent<{ name?: string; value: unknown }>) => void;
} & InputLabelProps &
    SelectProps;

export const SingleSelect = ({
    stateData,
    optionsValues,
    handleChange,
    id,
    label,
    name,
    disabled,
}: SingleSelectProps) => {
    const { t } = useTranslation();

    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel id={id}>{label}</InputLabel>
            <Select
                labelId={id}
                label={label}
                name={name}
                disabled={disabled}
                value={stateData.value || ''}
                error={stateData.error}
                onChange={handleChange}
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
            {stateData.error && <FormHelperText>{stateData.error}</FormHelperText>}
        </FormControl>
    );
};
