import React from 'react';
import { TextField, Typography, Box, makeStyles, createStyles } from '@material-ui/core';
import { useTranslation, Trans } from 'react-i18next';
import clsx from 'clsx';

import { ButtonSecondary } from '../../components/Button';
import { useIsDevice } from '../../queries/useBreakpoints';
import { emailTest } from '../../utils/emailTest';
import { Theme } from '../../theme';

const tPrefix = 'forgot-password-page';

type Props = {
    onChange: (value: string) => void;
    onSubmit: () => void;
    email: string;
};

export function ResetPasswordForm({ onChange, onSubmit, email }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();
    const { isDesktop } = useIsDevice();

    const [inputValue, setInputValue] = React.useState('');
    const [isError, setIsError] = React.useState(false);

    return (
        <div className={classes.container}>
            <Box mb={3}>
                <Typography variant="subtitle1" className={classes.subtitle}>
                    <Trans i18nKey={isDesktop ? `${tPrefix}.its-ok` : `${tPrefix}.its-ok-mobile`} />
                </Typography>
                <Typography variant="subtitle1" className={classes.subtitle}>
                    {t(`${tPrefix}.receive-link`)}
                </Typography>
            </Box>
            <TextField
                autoFocus
                error={isError}
                fullWidth
                value={email}
                id="email"
                label={t('e-mail')}
                variant="outlined"
                helperText={isError ? t(`${tPrefix}.incorrect-email-helper-text`) : t(`${tPrefix}.email-helper-text`)}
                onChange={({ target: { value } }) => handleChange(value)}
                onBlur={handleBlur}
            />
            <Box
                mt={3}
                className={clsx({
                    [classes.buttonContinue]: true,
                    [classes.buttonContinueMobile]: !isDesktop,
                })}
            >
                <ButtonSecondary
                    variant="contained"
                    onClick={handleSubmit}
                    innerText={t('forgot-password-page.continue')}
                    disabled={isError}
                />
            </Box>
        </div>
    );

    function handleSubmit() {
        if (emailTest(inputValue)) {
            setIsError(false);
            onSubmit();
        } else {
            setIsError(true);
        }
    }

    function handleChange(value: string) {
        setIsError(false);
        setInputValue(value);
        onChange(value);
    }

    function handleBlur() {
        if (!emailTest(email)) setIsError(true);
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '100%',
            maxWidth: 500,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        subtitle: {
            width: '350px',
            textAlign: 'center',
        },
        buttonContinue: {
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
            justifyItem: 'flex-end',
        },
        buttonContinueMobile: {
            marginBottom: theme.spacing(5),
        },
    }),
);
