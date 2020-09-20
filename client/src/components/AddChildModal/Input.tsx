import React, { FC } from 'react';
import TextField from '@material-ui/core/TextField';
import { FieldAttributes, useField } from 'formik';

interface InputProps {
    label: string;
}

export const Input: FC<FieldAttributes<InputProps>> = ({ label, ...props }) => {
    const { name } = props;
    const [field, meta] = useField<InputProps>(props);
    const errorText = meta.error && meta.touched ? meta.error : '';

    return (
        <TextField
            {...field}
            error={!!errorText}
            helperText={errorText}
            name={name}
            label={label}
            id="outlined-helperText"
            variant="outlined"
            fullWidth
        />
    );
};
