import { TextField } from '@material-ui/core';

interface Props {
    label: string;
    value: string;
    name: string;
    error: string | undefined;
    touched?: boolean;
    multiline?: boolean;
    rows?: number;
    disabled?: boolean;
    onChange: (name: string, value: string) => void;
}

export function Input({ label, value, name, onChange, error, touched, multiline, rows, disabled }: Props) {
    const errorText = error && touched ? error : '';

    return (
        <TextField
            multiline={multiline}
            rows={rows}
            error={!!errorText}
            helperText={errorText}
            name={name}
            value={value}
            label={label}
            disabled={disabled}
            id="outlined-helperText"
            variant="outlined"
            fullWidth
            onChange={({ target: { name: inputName, value: inputValue } }) =>
                onChange(inputName as string, inputValue as string)
            }
        />
    );
}
