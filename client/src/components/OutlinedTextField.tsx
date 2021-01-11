import React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';

interface Props {
    label: string;
    input: string;
    options?: Partial<TextFieldProps>;
    onChange: (value: string) => void;
}

export function OutlinedTextField({ label, input, options = {}, onChange }: Props) {
    return (
        <TextField
            variant="outlined"
            label={label}
            value={input}
            onChange={({ target: { value } }) => onChange(value)}
            fullWidth
            {...options}
        />
    );
}
