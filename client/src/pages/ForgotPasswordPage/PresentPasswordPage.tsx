import React, { ChangeEvent } from 'react';
import { TextField, Button, Typography, makeStyles, createStyles } from '@material-ui/core';
import { isValidEmail } from './isValidEmail';
import { useTranslation } from 'react-i18next';
import { Theme } from '../../theme/types';
import { backgroundColor, secondaryColor, white } from '../../colors';

const t_prefix = 'forgot-password-page';

type PresentPasswordPage = {
    handleInputChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    handleCreateNewPassword: () => void;
    email: string;
};

export const PresentPasswordPage = ({ handleInputChange, handleCreateNewPassword, email }: PresentPasswordPage) => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <>
            <Typography className={classes.subtitle}>{t(`${t_prefix}.its-ok`)}</Typography>
            <Typography className={`${classes.subtitle} ${classes.subtitleThin}`}>
                {t(`${t_prefix}.receive-link`)}
            </Typography>
            <TextField
                required
                value={email}
                id="email"
                label={t('e-mail')}
                variant="outlined"
                className={classes.textField}
                helperText={t(`${t_prefix}.email-helper-text`)}
                onChange={handleInputChange}
            />
            <div className={classes.buttonWrapper}>
                <Button
                    variant="contained"
                    disabled={!isValidEmail(email)}
                    color="secondary"
                    className={classes.button}
                    onClick={handleCreateNewPassword}
                >
                    {t(`${t_prefix}.new-password`)}
                </Button>
            </div>
            <div className={classes.underlinedText}>
                <Typography variant="caption">{t(`${t_prefix}.problem`)}</Typography>
                <Typography variant="caption">{t(`${t_prefix}.contact`)}</Typography>
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
        textField: {
            width: '100%',
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
    }),
);
