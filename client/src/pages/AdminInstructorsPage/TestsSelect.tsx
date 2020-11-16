import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

interface Props {
    label: string;
}

export const TestsSelect = ({ label }: Props) => {
    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel id="test-select-label">{label}</InputLabel>
            <Select
                labelId="test-select-label"
                id="test-select"
                label={label}
                MenuProps={{
                    getContentAnchorEl: null,
                    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                }}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem>Test 1</MenuItem>
                <MenuItem>Test 2</MenuItem>
                <MenuItem>Test 3</MenuItem>
            </Select>
        </FormControl>
    );
};
