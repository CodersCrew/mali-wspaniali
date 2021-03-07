import { ReactNode } from 'react';
import { TextField } from '@material-ui/core';

interface Props {
    name?: string;
    className?: string;
    size?: 'small' | 'medium';
    value: string;
    label: string;
    items: ReactNode[];
    disabled?: boolean;
    onSelect: (value: string) => void;
}

export function SelectList({ name, className, size, value, label, items, disabled, onSelect }: Props) {
    return (
        <TextField
            name={name}
            className={className}
            size={size}
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
