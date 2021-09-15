import React, { FormEvent, useState } from 'react';
import {
    TextField,
    makeStyles,
    createStyles,
    Typography,
    Box,
    Divider,
    CircularProgress,
    InputAdornment,
    IconButton,
    FormControl,
    OutlinedInput,
    InputLabel,
} from '@material-ui/core/';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import { ButtonSecondary } from '../../components/Button';
import { Theme } from '../../theme';
import { useAuthorizeMe } from '../../operations/mutations/User/authorizeMe';
import { useIsDevice } from '../../queries/useBreakpoints';
import { openSnackbar } from '../../components/Snackbar/openSnackbar';
import { PartnerLogotypeContainer } from '../AuthTemplate/PartnerLogotypeContainer';
import { useConfirmUser } from '../../operations/mutations/User/confirmUser';

const initialError: Error = {
    name: '',
    message: '',
};

export default function LoginPage() {
    const { t } = useTranslation();
    const classes = useStyles();
    const history = useHistory();
    const { authorizeMe } = useAuthorizeMe(
        (user) => {
            setLoading(() => false);
            history.push(`/${user.role}`);
        },
        (error) => {
            setLoading(() => false);
            setLoginError(error);
            handleConfirmationErrors(error);
        },
    );
    const { isDesktop } = useIsDevice();
    const { confirmUser } = useConfirmUser(handleConfirmationSuccess, handleConfirmationErrors);
    const params = useParams<{ confirm?: string }>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(initialError);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    React.useEffect(() => {
        if (params.confirm) {
            confirmUser(params.confirm);
        }
    }, [params.confirm]);

    return (
        <div className={classes.container}>
            <div className={classes.innerContainer}>
                <form onSubmit={handleSubmit} autoComplete="off" className={classes.form}>
                    <Typography variant="h3" className={classes.loginHeader}>
                        {t('login-page.login-header')}
                    </Typography>
                    {isDesktop ? (
                        <Box mb={6} />
                    ) : (
                        <>
                            <Typography variant="subtitle1" className={classes.welcomeText}>
                                {t('login-wrapper.welcome-text')}
                            </Typography>
                            <Box mb={5} />
                        </>
                    )}
                    <TextField
                        required
                        onChange={({ target: { value } }) => {
                            setEmail(value);
                            setLoginError((prevState) => ({ ...prevState, message: '' }));
                        }}
                        value={email}
                        id="email"
                        label={t('e-mail')}
                        variant="outlined"
                        error={!!loginError.message}
                        helperText={t('login-page.e-mail-helper-text')}
                        className={classes.formItem}
                    />
                    <Box mb={2} />
                    <FormControl variant={'outlined'} fullWidth required error={!!loginError.message}>
                        <InputLabel htmlFor="password">{t('password')}</InputLabel>
                        <OutlinedInput
                            label={t('password')}
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={({ target: { value } }) => {
                                setPassword(value);
                                setLoginError((prevState) => {
                                    return { ...prevState, message: '' };
                                });
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={togglePasswordVisibility}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Box mb={6} />
                    <div className={classes.submitWrapper}>
                        <ButtonSecondary
                            variant="text"
                            innerText={t('login-page.forgot-password')}
                            className={classes.forgotPasswordButton}
                            onClick={() => history.push('/forgot-password')}
                        />
                        <div className={classes.buttonWrapper}>
                            <ButtonSecondary
                                variant="contained"
                                type="submit"
                                disabled={!email || !password || loading}
                                innerText={t('login-page.login')}
                                classes={loading ? { label: classes.buttonProgressText } : {}}
                            />
                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </div>
                    </div>

                    <>
                        <Box mb={isDesktop ? 7 : 4.5} />
                        <Divider className={classes.divider} orientation="horizontal" variant="fullWidth" />
                        <Box mb={isDesktop ? 7 : 4} />
                    </>
                </form>
                <div className={classes.registerWrapper}>
                    <Typography>{t('login-page.no-account')} </Typography>
                    <Box mb={3} />
                    <ButtonSecondary
                        variant="outlined"
                        innerText={t('login-page.register')}
                        className={classes.forgotPasswordButton}
                        onClick={() => history.push('/register')}
                    />
                </div>
                <Box mb={3} />
                {!isDesktop && <PartnerLogotypeContainer />}
            </div>
        </div>
    );

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        setLoading(() => true);
        authorizeMe(email, password);
    }

    function handleConfirmationErrors(error: Error) {
        if (error.message === 'confirmation-failed') {
            openSnackbar({
                headerText: t('login-page.confirmation-error.title'),
                text: t('login-page.confirmation-error.description'),
                severity: 'error',
            });

            history.push('/login');

            return;
        }

        openSnackbar({
            text: t('login-page.login-error'),
            severity: 'error',
            anchor: { vertical: 'top', horizontal: 'center' },
        });
    }

    function handleConfirmationSuccess() {
        openSnackbar({ text: t('login-page.confirmation-success'), severity: 'success' });
        history.push('/login');
    }

    function togglePasswordVisibility() {
        setShowPassword((prev) => !prev);
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: theme.spacing(0, 2),
            [theme.breakpoints.down('md')]: {
                justifyContent: 'flex-start',
            },
        },
        topHeader: {
            width: '100%',
            height: 56,
            minHeight: 56,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        innerContainer: {
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 112px)',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            paddingBottom: theme.spacing(2),
            [theme.breakpoints.down('md')]: {
                justifyContent: 'flex-start',
                height: 'auto',
            },
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80%',
            [theme.breakpoints.down('md')]: {
                minHeight: 'auto',
                width: '100%',
                marginTop: theme.spacing(2),
            },
        },
        formItem: {
            width: '100%',
            maxWidth: 500,
            minWidth: 328,
            [theme.breakpoints.down('md')]: {
                margin: 0,
            },
        },
        loginHeader: {
            [theme.breakpoints.down('md')]: {
                marginTop: theme.spacing(4),
            },
        },
        submitWrapper: {
            width: '100%',
            maxWidth: 500,
            minWidth: 328,
            display: 'flex',
            marginDown: 'auto',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        registerWrapper: {
            maxWidth: 500,
            minWidth: 328,
            textAlign: 'center',
        },
        registerLink: {
            marginLeft: 5,
        },
        forgotPasswordButton: {
            textAlign: 'center',
            whiteSpace: 'normal',
            fontSize: '12px',
        },
        welcomeText: {
            marginTop: theme.spacing(3),
            textAlign: 'center',
            minWidth: 328,
        },
        divider: {
            width: '100%',
        },
        buttonWrapper: {
            position: 'relative',
        },
        buttonProgress: {
            color: theme.palette.secondary.main,
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
            zIndex: 1000,
        },
        buttonProgressText: {
            color: theme.palette.action.hover,
        },
    }),
);
