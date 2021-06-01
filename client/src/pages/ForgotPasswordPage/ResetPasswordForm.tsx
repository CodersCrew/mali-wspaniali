import { TextField, Typography, Box, makeStyles, createStyles } from '@material-ui/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';

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
    const device = useIsDevice();
    const [inputValue, setInputValue] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = () => {
        if (emailTest(inputValue)) {
            setIsError(false);
            onSubmit();
        } else {
            setIsError(true);
        }
    };

    const handleChange = (value: string) => {
        setIsError(false);
        setInputValue(value);
        onChange(value);
    };

    const handleBlur = () => {
        if (!emailTest(email)) setIsError(true);
    };

    return (
        <div className={classes.container}>
            <Box mb={3}>
                <Typography variant="subtitle1" className={classes.subtitle}>
                    {parse(t(device.isDesktop ? `${tPrefix}.its-ok` : `${tPrefix}.its-ok-mobile`))}
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
            <Box mt={3} className={classes.button}>
                <ButtonSecondary
                    variant="contained"
                    onClick={handleSubmit}
                    innerText={t('forgot-password-page.continue')}
                    disabled={isError}
                />
            </Box>
        </div>
    );
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
            [theme.breakpoints.down('sm')]: {
                fontSize: '16px',
                fontWeight: 500,
            },
        },
        button: {
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
            justifyItem: 'flex-end',
            [theme.breakpoints.down('sm')]: {
                marginBottom: theme.spacing(5),
            },
        },
    }),
);
