import { TextField } from '@material-ui/core';

export function CommonTextField(props: { label: string; onChange: (value: string) => void }) {
    return (
        <TextField
            variant="outlined"
            fullWidth
            label={props.label}
            onChange={({ target: { value } }) => props.onChange(value)}
        />
    );
}
