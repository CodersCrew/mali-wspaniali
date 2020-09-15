import React, { ChangeEvent, ReactNode } from 'react';
import { MenuItem, FormControl, InputLabel, Select, Checkbox, ListItemText } from '@material-ui/core';

interface Props {
    stateData: string[];
    optionsValues: {
        value: string;
        label: string;
    }[];
    handleChange: (e: ChangeEvent<any>) => void;
    id: string;
    label: string;
    name: string;
    disabled?: boolean;
    renderValue: (value: any) => ReactNode;
}

export const MultipleSelect = ({
    stateData,
    optionsValues,
    handleChange,
    id,
    label,
    name,
    disabled,
    renderValue,
}: Props) => {
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
            >
                {optionsValues.map(item => {
                    const { value, label: selectLabel } = item;

                    return (
                        <MenuItem key={value} value={value}>
                            <Checkbox checked={stateData.indexOf(value) > -1} color="primary" />
                            <ListItemText primary={selectLabel} />
                        </MenuItem>
                    );
                })}
            </Select>
            {/* {stateData.error && <FormHelperText>{stateData.error}</FormHelperText>} */}
        </FormControl>
    );
};
