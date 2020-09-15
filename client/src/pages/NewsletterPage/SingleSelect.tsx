import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';

interface Props {
    stateData: string;
    optionsValues: {
        value: string;
        label: string;
    }[];
    handleChange: (e: ChangeEvent<any>) => void;
    id: string;
    label: string;
    name: string;
    disabled?: boolean;
}

export const SingleSelect = ({ stateData, optionsValues, handleChange, id, label, name, disabled }: Props) => {
    const { t } = useTranslation();

    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel id={id}>{label}</InputLabel>
            <Select
                labelId={id}
                label={label}
                name={name}
                disabled={disabled}
                value={stateData || ''}
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
            {/* {stateData.error && <FormHelperText>{stateData.error}</FormHelperText>} */}
        </FormControl>
    );
};
