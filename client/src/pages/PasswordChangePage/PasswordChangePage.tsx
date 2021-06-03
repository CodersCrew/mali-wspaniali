import { useState, FormEvent, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles, Typography, Box, Link } from '@material-ui/core/';
import clsx from 'clsx';

import { Theme } from '../../theme';
import SuccessImage from '../../assets/forgotPassword/success.png';
import { openAlertDialog } from '../../components/AlertDialog';
import { ButtonSecondary } from '../../components/Button';
import { useIsDevice } from '../../queries/useBreakpoints';

import { PasswordChangeForm } from './PasswordChangeForm';
import { passwordStrengthTest } from './passwordStrengthTest';
import { PassChangeForm } from './types';
import { PasswordSuccessfullyChanged } from './PasswordSuccessfullyChanged';

const initialState: PassChangeForm = {
    password: '',
    passwordConfirm: '',
};

export default function PasswordChangePage() {
    const { t } = useTranslation();
    const classes = useStyles();
    const { isDesktop } = useIsDevice();

    const [form, setForm] = useState(initialState);
    const [onSuccess, setOnSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const { password, passwordConfirm } = form;

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
        setLoading(true);
        setTimeout(() => {
            setOnSuccess(true);
            setLoading(false);
        }, 2000);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setError(false);
        const { id, value } = event.target;
        setForm((prevForm) => ({ ...prevForm, [id]: value }));
    };

    return (
        <>
            <div className={classes.container}>
                {onSuccess ? (
                    <PasswordSuccessfullyChanged />
                ) : (
                    <>
                        <div
                            className={clsx({
                                [classes.innerContainer]: true,
                                [classes.innerContainerMobile]: !isDesktop,
                            })}
                        >
                            <img
                                className={clsx({ [classes.image]: true, [classes.imageMobile]: !isDesktop })}
                                src={SuccessImage}
                                alt={t('forgot-password-page.avatar')}
                            />
                            <Typography
                                variant="h4"
                                className={clsx({ [classes.title]: true, [classes.titleMobile]: !isDesktop })}
                            >
                                {t('password-change-page.new-password-title')}
                            </Typography>
                            <form className={classes.form} onSubmit={handleSubmit}>
                                <PasswordChangeForm
                                    handleChange={handleChange}
                                    password={password}
                                    passwordConfirm={passwordConfirm}
                                    error={error}
                                    setError={setError}
                                    loading={loading}
                                />
                            </form>
                            <Box className={classes.separator} />
                        </div>
                        <div
                            className={clsx({
                                [classes.footer]: true,
                                [classes.footerMobile]: !isDesktop,
                            })}
                        >
                            <Typography variant="caption">{t('forgot-password-page.problem')}</Typography>
                            <Link href="mailto:test@test.pl" underline="always" color="textPrimary">
                                <Typography variant="caption">{t('forgot-password-page.contact')}</Typography>
                            </Link>
                            <ButtonSecondary variant="text" href="/" className={classes.backToLoginButton}>
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
        container: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
        },

        innerContainer: {
            width: '100%',
            minWidth: 'calc(328px + 2 * 24px)',
            padding: theme.spacing(0, 3),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        innerContainerMobile: {
            justifyContent: 'space-between',
        },
        image: {
            borderRadius: '50%',
            width: theme.spacing(28),
        },
        imageMobile: {
            width: 100,
            marginTop: theme.spacing(4),
        },
        title: {
            textAlign: 'center',
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2),
            textTransform: 'uppercase',
        },
        titleMobile: {
            marginTop: theme.spacing(4),
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

        footer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        footerMobile: {
            marginTop: 0,
            justifyContent: 'flex-end',
            paddingBottom: theme.spacing(2),
        },
        backToLoginButton: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2.25),
        },
    }),
);
