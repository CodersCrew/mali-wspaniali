import React, { ReactNode } from 'react';
import { TextField } from '@material-ui/core';

interface Props {
    value: string;
    label: string;
    items: ReactNode[];
    onSelect: (value: string) => void;
}

export function SelectList({ value, label, items, onSelect }: Props) {
    return (
        <TextField
            select
            label={label}
            onChange={({ target: { value: v } }) => onSelect(v)}
            variant="outlined"
            value={value}
            fullWidth
            SelectProps={{
                MenuProps: {
                    getContentAnchorEl: null,
                    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                },
            }}
        >
            {items}
        </TextField>
    );
}
