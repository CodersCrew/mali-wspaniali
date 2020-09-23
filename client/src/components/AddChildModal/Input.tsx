import React, { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';

interface InputProps {
    label: string;
    value: string;
    name: string;
    error: string | undefined;
    touched: any;
    onChange: (e: ChangeEvent) => void;
}

export const Input = ({ label, value, name, onChange, error, touched }: InputProps) => {
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
            onChange={onChange}
        />
    );
};
