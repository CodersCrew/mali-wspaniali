import React, { useState } from 'react';
import {
    Typography,
    InputAdornment,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    IconButton,
} from '@material-ui/core/';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { RegistrationPasswordProps } from './types';

export const RegistrationPassword = ({
    handleChange,
    handleBack,
    activeStep,
    password,
    passwordConfirm,
    classButton,
    classNextBtn,
    classPrevBtn,
    classFormItem,
}: RegistrationPasswordProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useTranslation();

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    return (
        <>
            <Typography>
                {t('registration-page.create-password-text')}
            </Typography>
            <FormControl variant="outlined" className={classFormItem}>
                <InputLabel htmlFor="password">{t('password')}</InputLabel>
                <OutlinedInput
                    required
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handleChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={togglePasswordVisibility}
                                edge="end"
                            >
                                {showPassword ? (
                                    <Visibility />
                                ) : (
                                    <VisibilityOff />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                    labelWidth={70}
                    data-testid="password"
                />
            </FormControl>
            <FormControl variant="outlined" className={classFormItem}>
                <InputLabel htmlFor="passwordConfirm">
                    {t('registration-page.password-confirm')}
                </InputLabel>
                <OutlinedInput
                    required
                    id="passwordConfirm"
                    type={showPassword ? 'text' : 'password'}
                    value={passwordConfirm}
                    onChange={handleChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={togglePasswordVisibility}
                                edge="end"
                            >
                                {showPassword ? (
                                    <Visibility />
                                ) : (
                                    <VisibilityOff />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                    data-testid="confirmPassword"
                    labelWidth={150}
                />
            </FormControl>
            <div className={classButton}>
                <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classPrevBtn}
                >
                    {t('back')}
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    className={classNextBtn}
                    color="secondary"
                >
                    {t('registration-page.create-password')}
                </Button>
            </div>
        </>
    );
};
