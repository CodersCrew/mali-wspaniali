import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { PrivilegedUser } from '../../graphql/types';

interface Props {
    label: string;
    options: PrivilegedUser[];
    value?: string;
    onChange: (instructorId: string) => void;
}

export const InstructorsSelect = ({ label, options, value, onChange }: Props) => {
    const { t } = useTranslation();

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
                onChange={e => onChange(e.target.value as string)}
            >
                <MenuItem value="">{t('admin-instructors-page.all-instructors')}</MenuItem>
                {options.map(instructor => (
                    <MenuItem key={instructor._id} value={instructor._id}>
                        {instructor.mail}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
