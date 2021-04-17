import { ReactNode } from 'react';
import { TextField } from '@material-ui/core';

interface Props {
    value: string;
    label: string;
    items: ReactNode[];
    disabled?: boolean;
    onSelect: (value: string) => void;
}

export function SelectList({ value, label, items, disabled, onSelect }: Props) {
    return (
        <TextField
            select
            label={label}
            onChange={({ target: { value: v } }) => onSelect(v)}
            variant="outlined"
            value={value}
            fullWidth
            disabled={disabled}
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
