import React, { Dispatch, SetStateAction, ChangeEvent } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Assessment } from '../../graphql/types';

interface Props {
    label: string;
    options: Assessment[];
    value?: string;
    setSelectedAssessment?: Dispatch<SetStateAction<string>>;
    disabled?: boolean;
}

export const AssessmentsSelect = ({ label, options, setSelectedAssessment, value, disabled }: Props) => {
    const handleChange = setSelectedAssessment
        ? (e: ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
              setSelectedAssessment(e.target.value as string);
          }
        : undefined;

    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel id="test-select-label">{label}</InputLabel>
            <Select
                labelId="test-select-label"
                id="test-select"
                label={label}
                disabled={disabled}
                value={value}
                onChange={handleChange}
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
