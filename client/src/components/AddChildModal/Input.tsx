import React from 'react';
import TextField from '@material-ui/core/TextField';

interface Props {
    label: string;
    value: string;
    name: string;
    error: string | undefined;
    touched: any;
    rows?: number;
    onChange: (name: string, value: string) => void;
}

export function Input({ label, value, name, onChange, error, touched, rows }: Props) {
    const errorText = error && touched ? error : '';

    return (
        <TextField
            error={!!errorText}
            helperText={errorText}
            name={name}
            value={value}
            label={label}
            id="outlined-helperText"
            variant="outlined"
            fullWidth
            rows={rows || 0}
            multiline
            onChange={({ target: { name: inputName, value: inputValue } }) =>
                onChange(inputName as string, inputValue as string)
            }
        />
    );
}
