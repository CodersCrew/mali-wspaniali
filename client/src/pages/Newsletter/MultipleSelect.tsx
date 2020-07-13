import React from 'react';
import { MenuItem, FormControl, InputLabel, Select, Checkbox, ListItemText, FormHelperText } from '@material-ui/core';
import { MultipleSelectProps } from './types';

export const MultipleSelect = ({
    stateData,
    optionsValues,
    handleChange,
    id,
    label,
    name,
    disabled,
}: MultipleSelectProps) => {
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
                multiple
                renderValue={selected => (selected as string[]).join(', ')}
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
                {optionsValues &&
                    optionsValues.map(item => {
                        const { value, label: selectLabel } = item;

                        return (
                            <MenuItem key={value} value={value}>
                                <Checkbox checked={stateData.value.indexOf(value) > -1} color="primary" />
                                <ListItemText primary={selectLabel} />
                            </MenuItem>
                        );
                    })}
            </Select>
            {stateData.error && <FormHelperText>{stateData.error}</FormHelperText>}
        </FormControl>
    );
};
