import {
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    createStyles,
    makeStyles,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import {
    ChangePasswordPanelComponentsProps,
    CHANGE_OLD_PASSWORD,
    TOGGLE_OLD_PASSWORD_VISIBILITY,
} from '../ChangePasswordPanelReducer';

// TODO: Should ENTER pressed during typing the password do the same action as BUTTON click? - invoke password reset process
export const FormControlOldPassword = (props: ChangePasswordPanelComponentsProps) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { state, dispatch } = props;
    const { oldPassword, oldPasswordDisabled, oldPasswordError, oldPasswordHelperText, showOldPassword } = state;

    return (
        <FormControl variant="outlined" className={classes.form}>
            <InputLabel htmlFor="old-password">{t('settings-page.old-password')}</InputLabel>
            <OutlinedInput
                required
                fullWidth
                id="old-password"
                label={t('settings-page.old-password')}
                type={showOldPassword ? 'text' : 'password'}
                value={oldPassword}
                error={oldPasswordError}
                disabled={oldPasswordDisabled}
                onChange={(event) => dispatch({ type: CHANGE_OLD_PASSWORD, payload: { value: event.target.value } })}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={() => dispatch({ type: TOGGLE_OLD_PASSWORD_VISIBILITY })}
                        >
                            {showOldPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
                inputProps={{
                    tabIndex: 1,
                }}
            />
            <FormHelperText error={oldPasswordError}>{oldPasswordHelperText || ''}</FormHelperText>
        </FormControl>
    );
};

const useStyles = makeStyles(() =>
    createStyles({
        form: { display: 'block', marginBottom: '15px', width: '100%' },
    }),
);
