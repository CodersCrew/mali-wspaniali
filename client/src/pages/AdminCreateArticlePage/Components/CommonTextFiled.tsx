import { TextField } from '@material-ui/core';

export function CommonTextField(props: {
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
}
