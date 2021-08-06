import { TextField } from '@material-ui/core';

export function CommonTextField(props: { value: string; label: string; onChange: (value: string) => void }) {
    return (
        <TextField
            variant="outlined"
            value={props.value}
            fullWidth
            label={props.label}
            onChange={({ target: { value } }) => props.onChange(value)}
        />
    );
}
