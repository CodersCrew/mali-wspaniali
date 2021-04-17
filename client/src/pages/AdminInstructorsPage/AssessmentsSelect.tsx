import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Assessment } from '../../graphql/types';

interface Props {
    label: string;
    options: Assessment[];
    value: Assessment;
    onChange: (title: string) => void;
}

export const AssessmentsSelect = ({ label, options, onChange, value }: Props) => {
    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel id="test-select-label">{label}</InputLabel>
            <Select
                labelId="test-select-label"
                id="test-select"
                label={label}
                value={value.title}
                onChange={(e) => onChange(e.target.value as string)}
                MenuProps={{
                    getContentAnchorEl: null,
                    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                }}
            >
                {options.map((assessment) => (
                    <MenuItem key={assessment._id} value={assessment.title}>
                        {assessment.title}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
