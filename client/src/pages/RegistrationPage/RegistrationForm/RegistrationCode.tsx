import React from 'react';
import { createStyles, makeStyles, TextField, Typography } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';

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
}: RegistrationCodeProps) => {
    const { t } = useTranslation();
    const classes = useStyles();

    // const inputRef = useRef();

    const handleClick = () => {
        openAlertDialog({
            type: 'info',
            title: t('registration-page.no-code'),
            description: `${t('registration-page.no-code-desc')} <span class="${classes.strong}">${t(
                'registration-page.no-code-desc-email',
            )}</span>`,
        });
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (code.length >= 9) handleNext();
        }
    };

    /*
    useEffect(() => {
        if (inputRef.current !== undefined) inputRef.current.focus();
    }, []);

*/
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
                    disabled={code.length < 9}
                    data-testid="code-next"
                    innerText={t('next')}
                />
                <ButtonSecondary variant="text" onClick={handleClick} innerText={t('registration-page.no-code')} />
            </div>
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        strong: {
            fontWeight: theme.typography.fontWeightMedium,
        },
    }),
);
