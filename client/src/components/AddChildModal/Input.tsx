import React from 'react';
import TextField from '@material-ui/core/TextField';

interface Props {
    label: string;
    value: string;
    name: string;
    error: string | undefined;
    touched: any;
    multiline?: boolean;
    onChange: (name: string, value: string) => void;
}

export function Input({ label, value, name, onChange, error, touched, multiline }: Props) {
    const errorText = error && touched ? error : '';

    return (
        <TextField
            multiline={multiline}
            error={!!errorText}
            helperText={errorText}
            name={name}
            value={value}
            label={label}
            id="outlined-helperText"
            variant="outlined"
            fullWidth
            onChange={({ target: { name: inputName, value: inputValue } }) =>
                onChange(inputName as string, inputValue as string)
            }
        />
    );
}
