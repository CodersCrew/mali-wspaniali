import { useState, FormEvent, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles, Box, Typography, Link } from '@material-ui/core/';

import { Theme } from '../../theme/types';
import SuccessImage from '../../assets/forgotPassword/success.png';
import { LanguageSelector } from '../../components/LanguageSelector';
import { openAlertDialog } from '../../components/AlertDialog';
import { ButtonSecondary } from '../../components/Button';
import dayjs from '../../localizedMoment';
import { useIsDevice } from '../../queries/useBreakpoints';

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
    const { password, passwordConfirm } = form;
    const { i18n } = useTranslation();
    const language = localStorage.getItem('i18nextLng')!;
    const { isMobile } = useIsDevice();

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
        } else if (password !== passwordConfirm) {
            openAlertDialog({
                type: 'error',
                description: t('registration-page.password-mismatch'),
            });
        } else {
            // TODO: password change

            setOnSuccess(true);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { id, value } = event.target;
        setForm((prevForm) => ({ ...prevForm, [id]: value }));
    };

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <LanguageSelector language={language} onClick={handleLanguageChange} />
            </div>
            {onSuccess ? (
                <div className={classes.successLayout}>
                    <img className={classes.image} src={SuccessImage} alt={t('forgot-password-page.avatar')} />
                    <Typography variant="h3" className={classes.successTitle}>
                        <Box fontWeight="fontWeightRegular">
                            {t('password-change-success-page.password-change-success-title')}
                        </Box>
                    </Typography>
                    <Typography variant="subtitle1" align="center" className={classes.successSubtitle}>
                        {t('password-change-success-page.password-change-success-subtitle')}
                    </Typography>
                    <ButtonSecondary
                        variant="contained"
                        type="button"
                        href="/login"
                        innerText={t('password-change-success-page.login')}
                    />
                </div>
            ) : (
                <Box
                    display="flex"
                    justifyContent="space-around"
                    alignItems="center"
                    flexDirection="column"
                    width={isMobile ? '90%' : '80%'}
                    flex={1}
                >
                    <div className={classes.layout}>
                        <img className={classes.image} src={SuccessImage} alt={t('forgot-password-page.avatar')} />
                        <Typography variant="h4" className={classes.title}>
                            {t('password-change-page.new-password-title')}
                        </Typography>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <PasswordChangeForm
                                handleChange={handleChange}
                                password={password}
                                passwordConfirm={passwordConfirm}
                            />
                        </form>
                    </div>
                    <div className={classes.footer}>
                        <Typography variant="caption">{t('forgot-password-page.problem')}</Typography>
                        <Link href="#" underline="always" color="textPrimary">
                            <Typography variant="caption">{t('forgot-password-page.contact')}</Typography>
                        </Link>
                        <Box mt={7}>
                            <ButtonSecondary variant="text" href="/">
                                {t('forgot-password-page.back-to-login')}
                            </ButtonSecondary>
                        </Box>
                    </div>
                </Box>
            )}
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100vh',
            overflowY: 'auto',
        },
        header: {
            marginLeft: 'auto',
        },
        layout: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            marginTop: theme.spacing(5),
        },
        successLayout: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80%',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
        },
        image: {
            borderRadius: '50%',
            width: theme.spacing(27),
            [theme.breakpoints.down('sm')]: {
                width: theme.spacing(14),
            },
        },
        successTitle: {
            textAlign: 'center',
            width: theme.spacing(35),
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(2),
        },
        successSubtitle: {
            width: theme.spacing(45),
            textAlign: 'center',
            marginBottom: theme.spacing(5),
        },
        title: {
            textAlign: 'center',
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2),
            textTransform: 'uppercase',
        },
        footer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: theme.spacing(4),
        },
    }),
);
