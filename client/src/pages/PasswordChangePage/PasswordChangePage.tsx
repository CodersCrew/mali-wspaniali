import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles, Typography, Box, Link } from '@material-ui/core/';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';

import { Theme } from '../../theme';
import SuccessImage from '../../assets/forgotPassword/success.png';
import { ButtonSecondary } from '../../components/Button';
import { useIsDevice } from '../../queries/useBreakpoints';
import { openSnackbar } from '../../components/Snackbar/openSnackbar';
import { PasswordChangeForm } from './PasswordChangeForm';
import { passwordStrengthTest } from './passwordStrengthTest';
import { PasswordSuccessfullyChanged } from './PasswordSuccessfullyChanged';
import { useChangePassword } from '../../operations/mutations/User/changePassword';

type PassChangeForm = {
    password: string;
    passwordConfirm: string;
};

type UrlParams = {
    confirmation?: string;
};

const initialState: PassChangeForm = {
    password: '',
    passwordConfirm: '',
};

export default function PasswordChangePage() {
    const { t } = useTranslation();
    const classes = useStyles();
    const { isDesktop } = useIsDevice();
    const { confirmation }: UrlParams = useParams();
    const { changePassword } = useChangePassword(
        () => setOnSuccess(true),
        () =>
            openSnackbar({
                text: t('password-change-page.password-change-failure'),
                severity: 'error',
                anchor: { vertical: 'top', horizontal: 'center' },
            }),
    );

    const [form, setForm] = useState(initialState);
    const [onSuccess, setOnSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const { password, passwordConfirm } = form;

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

    async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        if (!passwordStrengthTest(password)) {
            openSnackbar({
                text: t('registration-page.password-not-strong'),
                severity: 'error',
                anchor: { vertical: 'top', horizontal: 'center' },
            });

            return;
        }

        if (password !== passwordConfirm) return;

        if (confirmation) {
            setLoading(true);
            await changePassword(password, confirmation);
            setLoading(false);
        }
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
        setError(false);
        const { id, value } = event.target;
        setForm((prevForm) => ({ ...prevForm, [id]: value }));
    }
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
