import { ChangeEvent } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { PrivilegedUser } from '@app/graphql/types';

interface InstructorsSelectProps {
    label: string;
    options: PrivilegedUser[];
    values: PrivilegedUser[];
    onChange: (value: string[]) => void;
}

export const InstructorsSelect = (props: InstructorsSelectProps) => {
    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel id="instructor-select-label">{props.label}</InputLabel>
            <Select
                labelId="instructor-select-label"
                id="instructor-select"
                label={props.label}
                value={getSelectedInstructors()}
                multiple
                onChange={onSelect}
                MenuProps={{
                    getContentAnchorEl: null,
                    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                }}
            >
                {props.options.map((instructor) => (
                    <MenuItem key={instructor._id} value={instructor.mail}>
                        {instructor.mail}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    function getSelectedInstructors() {
        return props.values.map((value) => value.mail);
    }

    function onSelect(e: ChangeEvent<{ name?: string | undefined; value: unknown }>) {
        props.onChange(e.target.value as string[]);
    }
};
