import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

interface Props {
    label: string;
    options: {
        value: string;
        label: React.ReactNode;
        helperLabel: React.ReactNode;
    }[];
    value: string;
    onChange: (value: string) => void;
}

export const AdminKindergardenSelect = ({ label, options, onChange, value }: Props) => {
    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select label={label} value={value} onChange={(e) => onChange(e.target.value as string)}>
                {options?.map((kindergarden) => (
                    <MenuItem key={kindergarden.value} value={kindergarden.value}>
                        {kindergarden.label}&nbsp;{kindergarden.helperLabel}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
