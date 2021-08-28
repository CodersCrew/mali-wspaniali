import React from 'react';
import { Box, InputLabel, MenuItem, Select } from '@material-ui/core';
import pick from 'lodash.pick';
import isEqual from 'lodash.isequal';

export const CommonSelectField = React.memo(
    function CommonSelectField(props: {
        label: string;
        value: string;
        options: Array<{ label: string; value: string }>;
        onChange: (value: string) => void;
    }) {
        return (
            <>
                <Box mb={1}>
                    <InputLabel shrink>{props.label}</InputLabel>
                </Box>
                <Select
                    variant="outlined"
                    fullWidth
                    displayEmpty
                    value={props.value}
                    onChange={({ target: { value: _value } }) => {
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
    },
    (prev, next) => {
        const toCompare = ['options'];

        return isEqual(pick(prev, toCompare), pick(next, toCompare));
    },
);
