import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Assessment } from '../../graphql/types';

interface Props {
    label: string;
    options: Assessment[];
}

export const AssessmentsSelect = ({ label, options }: Props) => {
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
                {options.map(assessment => (
                    <MenuItem key={assessment._id} value={assessment._id}>
                        {assessment.title}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
