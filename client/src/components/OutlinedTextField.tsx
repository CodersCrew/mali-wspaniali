import { TextField, TextFieldProps } from '@material-ui/core';

interface OutlinedTextFieldProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    options?: Partial<TextFieldProps>;
}

export const OutlinedTextField = React.memo(
    function OutlinedTextField({ label, value, options = {}, onChange }: OutlinedTextFieldProps) {
        return (
            <TextField
                variant="outlined"
                label={label}
                value={value}
                onChange={({ target: { value: _value } }) => onChange(_value)}
                fullWidth
                {...options}
            />
        );
    },
    (prev, next) => prev.value === next.value && prev.label === next.label,
);
