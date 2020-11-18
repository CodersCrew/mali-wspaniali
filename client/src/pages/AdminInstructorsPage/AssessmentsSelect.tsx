import React, { Dispatch, SetStateAction, ChangeEvent } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Assessment } from '../../graphql/types';

interface Props {
    label: string;
    options: Assessment[];
    value: Assessment | null;
    setSelectedAssessment: Dispatch<SetStateAction<Assessment | null>>;
}

export const AssessmentsSelect = ({ label, options, setSelectedAssessment, value }: Props) => {
    const handleChange = (e: ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
        setSelectedAssessment(options.find(assess => assess._id === e.target.value) as Assessment);
    };

    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel id="test-select-label">{label}</InputLabel>
            <Select
                labelId="test-select-label"
                id="test-select"
                label={label}
                // TODO: figure out why it doesn't work on first render - the selected assessment is set properly, but it doesn't show the right option
                value={value?._id}
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
