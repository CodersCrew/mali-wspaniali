import React from 'react';
import { createStyles, makeStyles, TextField, Typography } from '@material-ui/core/';
import { useTranslation, Trans } from 'react-i18next';

import { openAlertDialog } from '../../../components/AlertDialog';
import { ButtonSecondary } from '../../../components/Button';
import { Theme } from '../../../theme';

import { RegistrationCodeProps } from './types';

export const RegistrationCode = ({
    handleChange,
    handleNext,
    code,
    classForm,
    classButton,
    classNextBtn,
    error,
    roleBasedKeyCode,
}: RegistrationCodeProps) => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <>
            <Typography variant="body1">{t('registration-page.enter-code-text')}</Typography>
            <TextField
                required
                onChange={handleChange}
                value={code}
                id="code"
                type="text"
                label={t('registration-page.enter-code')}
                variant="outlined"
                inputProps={{ 'data-testid': 'code' }}
                className={classForm}
                error={error}
                helperText={error && t('registration-page.invalid-code')}
                onKeyPress={handleKeyPress}
                autoFocus
            />
            <div className={classButton}>
                <ButtonSecondary
                    variant="contained"
                    onClick={handleNext}
                    className={classNextBtn}
                    disabled={!roleBasedKeyCode}
                    data-testid="code-next"
                    innerText={t('next')}
                />
                <ButtonSecondary
                    variant="text"
                    onClick={handleClick}
                    className={classes.noCodeButton}
                    innerText={t('registration-page.no-code')}
                />
            </div>
        </>
    );

    function handleClick() {
        openAlertDialog({
            type: 'info',
            title: t('registration-page.no-code'),
            description: <Trans i18nKey={'registration-page.no-code-desc'} />,
        });
    }

    function handleKeyPress(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key === 'Enter' && roleBasedKeyCode?.isValid()) {
            handleNext();
        }
    }
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        noCodeButton: {
            textAlign: 'center',
            whiteSpace: 'normal',
            fontSize: theme.typography.caption.fontSize,
        },
    }),
);
