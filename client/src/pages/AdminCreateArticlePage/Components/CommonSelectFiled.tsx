import React from 'react';
import { Box, InputLabel, MenuItem, Select } from '@material-ui/core';

export function CommonSelectField(props: {
    label: string;
    options: Array<{ label: string; value: string }>;
    onChange: (value: string) => void;
}) {
    const [value, setValue] = React.useState('');

    return (
        <>
            <Box mb={1}>
                <InputLabel shrink>{props.label}</InputLabel>
            </Box>
            <Select
                variant="outlined"
                fullWidth
                displayEmpty
                value={value}
                onChange={({ target: { value: _value } }) => {
                    setValue(_value as string);
                    props.onChange(_value as string);
                }}
            >
                {props.options.map((option) => (
                    <MenuItem key={option.value.toString()} value={option.value.toString()}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
}
