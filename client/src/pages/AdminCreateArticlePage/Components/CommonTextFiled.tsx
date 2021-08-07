import React from 'react';
import { TextField } from '@material-ui/core';
import pick from 'lodash.pick';
import isEqual from 'lodash.isequal';

export const CommonTextField = React.memo(
    function CommonTextField(props: {
        value: string;
        label: string;
        onChange: (value: string) => void;
        options?: { multiline?: true };
    }) {
        return (
            <TextField
                variant="outlined"
                value={props.value}
                fullWidth
                multiline={props.options?.multiline}
                minRows={props.options?.multiline ? 7 : 1}
                label={props.label}
                onChange={({ target: { value } }) => props.onChange(value)}
            />
        );
    },
    (prev, next) => {
        const toCompare = ['value'];

        return isEqual(pick(prev, toCompare), pick(next, toCompare));
    },
);
