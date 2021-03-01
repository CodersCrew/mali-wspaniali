import { TextField } from '@material-ui/core';

interface Props {
    value: string;
    label: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export function OutlinedDateField({ disabled, value, label, onChange }: Props) {
    return (
        <TextField
            id="date"
            disabled={disabled}
            label={label}
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{
                shrink: true,
            }}
            value={value}
            onChange={({ target: { value: date } }) => onChange(date)}
        />
    );
}
