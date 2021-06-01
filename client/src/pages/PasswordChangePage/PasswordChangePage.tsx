import { useState, FormEvent, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles, Typography, Box, Link } from '@material-ui/core/';

import { Theme } from '../../theme';
import SuccessImage from '../../assets/forgotPassword/success.png';
import { LanguageSelector } from '../../components/LanguageSelector';
import { openAlertDialog } from '../../components/AlertDialog';
import { ButtonSecondary } from '../../components/Button';
import dayjs from '../../localizedMoment';
import PasswordChangeSuccess from '../../assets/forgotPassword/password-change-success.svg';

import { PasswordChangeForm } from './PasswordChangeForm';
import { passwordStrengthTest } from './passwordStrengthTest';
import { PassChangeForm } from './types';

const initialState: PassChangeForm = {
    password: '',
    passwordConfirm: '',
};

export default function PasswordChangePage() {
    const { t } = useTranslation();
    const classes = useStyles();
    const [form, setForm] = useState(initialState);
    const [onSuccess, setOnSuccess] = useState(false);
    const [error, setError] = useState(false);
    const { password, passwordConfirm } = form;
    const { i18n } = useTranslation();
    const language = localStorage.getItem('i18nextLng')!;

    const handleLanguageChange = (lng: string) => {
        dayjs.locale(lng);

        return i18n.changeLanguage(lng);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (!passwordStrengthTest(password)) {
            openAlertDialog({
                type: 'error',
                description: t('registration-page.password-not-strong'),
            });

            return;
        }

        if (password !== passwordConfirm) return;

        // TODO: implement password change

        setOnSuccess(true);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setError(false);
        const { id, value } = event.target;
        setForm((prevForm) => ({ ...prevForm, [id]: value }));
    };

    return (
        <>
            <div className={classes.header}>
                <LanguageSelector language={language} onClick={handleLanguageChange} />
            </div>
            <div className={classes.container}>
                {onSuccess ? (
                    <div className={classes.successLayout}>
                        <img src={PasswordChangeSuccess} alt="" className={classes.passwordChangeSuccessImage} />
                        <Box mb={5} />
                        <Typography variant="h3" className={classes.successTitle}>
                            {t('password-change-success-page.password-change-success-title')}
                        </Typography>
                        <Box mb={2} />
                        <Typography variant="subtitle1" className={classes.successSubtitle}>
                            {t('password-change-success-page.password-change-success-subtitle')}
                        </Typography>
                        <Box mb={5} />
                        <ButtonSecondary
                            variant="contained"
                            type="button"
                            href="/login"
                            innerText={t('password-change-success-page.login')}
                        />
                    </div>
                ) : (
                    <>
                        <div className={classes.innerContainer}>
                            <img className={classes.image} src={SuccessImage} alt={t('forgot-password-page.avatar')} />
                            <Typography variant="h4" className={classes.title}>
                                {t('password-change-page.new-password-title')}
                            </Typography>
                            <form className={classes.form} onSubmit={handleSubmit}>
                                <PasswordChangeForm
                                    handleChange={handleChange}
                                    password={password}
                                    passwordConfirm={passwordConfirm}
                                    error={error}
                                    setError={setError}
                                />
                            </form>
                            <Box className={classes.separator} />
                            <Typography variant="caption">{t('forgot-password-page.problem')}</Typography>
                            <Link href="#" underline="always" color="textPrimary">
                                <Typography variant="caption">{t('forgot-password-page.contact')}</Typography>
                            </Link>
                        </div>
                        <div className={classes.footer}>
                            <ButtonSecondary variant="text" href="/">
                                {t('forgot-password-page.back-to-login')}
                            </ButtonSecondary>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            paddingRight: theme.spacing(1.5),
            paddingTop: theme.spacing(1.5),
            textAlign: 'right',
            [theme.breakpoints.down('sm')]: {
                minHeight: theme.spacing(8),
            },
        },
        container: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
        },

        innerContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            },
        },
        image: {
            borderRadius: '50%',
            width: theme.spacing(27),
            [theme.breakpoints.down('sm')]: {
                width: 100,
                marginTop: theme.spacing(4),
            },
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
        },
        separator: {
            marginBottom: '3em',
        },

        successLayout: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
                padding: theme.spacing(0, 6),
                marginTop: theme.spacing(8),
            },
        },
        passwordChangeSuccessImage: {
            height: 341,
        },
        successTitle: {
            textAlign: 'center',
            [theme.breakpoints.down('sm')]: {
                fontSize: '20px',
                fontWeight: 500,
                lineHeight: `${theme.spacing(3)}px`,
            },
        },
        successSubtitle: {
            textAlign: 'center',
            padding: theme.spacing(0, 10.5),
            [theme.breakpoints.down('sm')]: {
                padding: 0,
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: `${theme.spacing(2.5)}px`,
            },
        },
        title: {
            textAlign: 'center',
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2),
            textTransform: 'uppercase',
            [theme.breakpoints.down('sm')]: {
                marginTop: theme.spacing(4),
            },
        },

        footer: {
            paddingTop: '1em',
            paddingBottom: theme.spacing(3),
            [theme.breakpoints.down('sm')]: {
                marginTop: 0,
                justifyContent: 'flex-end',
                paddingBottom: theme.spacing(2),
            },
        },
    }),
);
