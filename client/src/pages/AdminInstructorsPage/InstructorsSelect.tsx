import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { User } from '../../graphql/types';

interface Props {
    label: string;
    options: User[];
}

export const InstructorsSelect = ({ label, options }: Props) => {
    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel id="instructor-select-label">{label}</InputLabel>
            <Select
                labelId="instructor-select-label"
                id="instructor-select"
                label={label}
                MenuProps={{
                    getContentAnchorEl: null,
                    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                }}
            >
                <MenuItem value="">none</MenuItem>
                {options.map(instructor => (
                    <MenuItem key={instructor._id} value={instructor._id}>
                        {instructor.mail}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
