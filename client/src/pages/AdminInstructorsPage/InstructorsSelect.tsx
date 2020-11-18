import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { User } from '../../graphql/types';

interface Props {
    label: string;
    options: User[];
    value?: string;
}

export const InstructorsSelect = ({ label, options, value }: Props) => {
    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel id="instructor-select-label">{label}</InputLabel>
            <Select
                labelId="instructor-select-label"
                id="instructor-select"
                label={label}
                value={value}
                MenuProps={{
                    getContentAnchorEl: null,
                    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                }}
            >
                {options.map(instructor => (
                    <MenuItem key={instructor._id} value={instructor._id}>
                        {instructor.mail}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
