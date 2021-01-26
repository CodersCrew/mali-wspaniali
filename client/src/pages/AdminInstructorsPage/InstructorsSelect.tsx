import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { PrivilegedUser } from '../../graphql/types';

interface Props {
    label: string;
    options: PrivilegedUser[];
    value: PrivilegedUser | null;
    onChange: (value: string) => void;
}

export const InstructorsSelect = ({ label, options, value, onChange }: Props) => {
    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel id="instructor-select-label">{label}</InputLabel>
            <Select
                labelId="instructor-select-label"
                id="instructor-select"
                label={label}
                value={value?._id || ''}
                onChange={(e) => onChange(e.target.value as string)}
                MenuProps={{
                    getContentAnchorEl: null,
                    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                }}
            >
                {options.map((instructor) => (
                    <MenuItem key={instructor._id} value={instructor._id}>
                        {instructor.mail}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
