import React from 'react';
import {
    createStyles,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    makeStyles,
    OutlinedInput,
} from '@material-ui/core';
import clsx from 'clsx';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import { useIsDevice } from '../../queries/useBreakpoints';
import { Theme } from '../../theme';

export type PasswordChangeFormInputProps = {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    error: boolean;
    id: string;
    label: string;
};

export const PasswordChangeFormInput: FC<PasswordChangeFormInputProps> = ({
    children,
    value,
    onChange,
    error,
    id,
    label,
}) => {
    const { isDesktop } = useIsDevice();
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormControl variant="outlined" fullWidth className={clsx({ [classes.formItem]: !isDesktop })}>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <OutlinedInput
                required
                id={id}
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePasswordVisibility}
                            edge="end"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
                data-testid={id}
                label={label}
                error={error}
            />
            {children}
        </FormControl>
    );

    function togglePasswordVisibility() {
        setShowPassword((prev) => !prev);
    }
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formItem: {
            marginTop: theme.spacing(2),
        },
    }),
);
