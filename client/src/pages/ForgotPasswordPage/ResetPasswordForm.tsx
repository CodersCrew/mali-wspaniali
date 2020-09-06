import React from 'react';
import { TextField, Typography, makeStyles, createStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Theme } from '../../theme/types';
import { backgroundColor, secondaryColor, white } from '../../colors';
import { ButtonSecondary } from '../../components/Button';

const tPrefix = 'forgot-password-page';

type Props = {
    onChange: (value: string) => void;
    onSubmit: () => void;
    isDisabled: boolean;
    email: string;
};

export const ResetPasswordForm = ({ onChange, onSubmit, isDisabled, email }: Props) => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <>
            <Typography className={classes.subtitle}>{t(`${tPrefix}.its-ok`)}</Typography>
            <Typography className={`${classes.subtitle} ${classes.subtitleThin}`}>
                {t(`${tPrefix}.receive-link`)}
            </Typography>
            <TextField
                required
                value={email}
                id="email"
                label={t('e-mail')}
                variant="outlined"
                helperText={t(`${tPrefix}.email-helper-text`)}
                onChange={({ target: { value } }) => onChange(value)}
            />
            <div className={classes.buttonWrapper}>
                <ButtonSecondary
                    variant="contained"
                    disabled={isDisabled}
                    className={classes.createPasswordButton}
                    onClick={onSubmit}
                    innerText={t('forgot-password-page.new-password')}
                />
            </div>
            <div className={classes.underlinedText}>
                <Typography variant="caption">{t(`${tPrefix}.problem`)}</Typography>
                <Typography variant="caption">{t(`${tPrefix}.contact`)}</Typography>
            </div>
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        loginLinkWrapper: {
            marginBottom: '20px',
            marginTop: '40px',
            fontStyle: 'normal',
            fontWeight: 'bold',
            color: white,
            textDecoration: 'none',
        },
        subtitle: {
            textAlign: 'center',
        },
        buttonWrapper: {
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-end',
        },
        button: {
            color: backgroundColor,
            fontWeight: 'bold',
            marginBottom: '20px',
            marginTop: '20px',

            [theme.breakpoints.down('sm')]: {
                marginBottom: '44px',
                marginTop: '30px',
            },

            '&disbled': {
                color: secondaryColor,
            },
        },
        subtitleThin: {
            marginBottom: '20px',
            width: '320px',
        },
        underlinedText: {
            textAlign: 'center',
            position: 'relative',
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',

            '&::after': {
                position: 'absolute',
                content: '""',
                height: '1px',
                margin: '0 auto',
                left: '0',
                bottom: '-2px',
                right: '0',
                width: '100%',
                background: 'black',
            },
        },
        createPasswordButton: {
            marginBottom: '20px',
            marginTop: '20px',

            [theme.breakpoints.down('sm')]: {
                marginBottom: '44px',
                marginTop: '30px',
            },
        },
    }),
);
