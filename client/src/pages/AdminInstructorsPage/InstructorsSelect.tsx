import { ChangeEvent, useMemo } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { PrivilegedUser } from '@app/graphql/types';

interface InstructorsSelectProps {
    label: string;
    options: PrivilegedUser[];
    values: PrivilegedUser[];
    onChange: (value: string[]) => void;
}

function sortInstructorsByEmails(a: { id: string; mail: string }, b: { id: string; mail: string }) {
    const collator = new Intl.Collator('pl', { sensitivity: 'base' });

    return collator.compare(a.mail, b.mail);
}

export const InstructorsSelect = ({ label, options, values, onChange }: InstructorsSelectProps) => {
    const instructors = useMemo(
        () =>
            options.map((option) => ({
                id: option._id,
                mail: option.mail,
            })),
        [options],
    );

    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel id="instructor-select-label">{label}</InputLabel>

            <Select
                labelId="instructor-select-label"
                id="instructor-select"
                label={label}
                value={getSelectedInstructors()}
                multiple
                onChange={onSelect}
                MenuProps={{
                    getContentAnchorEl: null,
                    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                }}
            >
                {instructors.sort(sortInstructorsByEmails).map((instructor) => (
                    <MenuItem key={instructor.id} value={instructor.mail}>
                        {instructor.mail}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    function getSelectedInstructors() {
        return values.map((value) => value.mail);
    }

    function onSelect(e: ChangeEvent<{ name?: string | undefined; value: unknown }>) {
        onChange(e.target.value as string[]);
    }
};
