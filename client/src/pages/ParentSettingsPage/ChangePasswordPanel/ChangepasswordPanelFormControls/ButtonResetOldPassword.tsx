import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ButtonSecondary } from '../../../../components/Button';
import { Me } from '../../../../graphql/types';
import { useAuthorizeMe } from '../../../../operations/mutations/User/authorizeMe';
import {
    ChangePasswordPanelComponentsProps,
    EMAIL_IS_CORRECT,
    UPDATE_HELPER_TEXT,
    PASSWORD_RESET_EMAIL_SENT,
} from '../ChangePasswordPanelReducer';
import { openSnackbar } from '../../../../components/Snackbar/openSnackbar';
import { useResetPassword } from '../../../../operations/mutations/User/resetPassword';

interface Props extends ChangePasswordPanelComponentsProps {
    user: Me | null;
}

export const ButtonResetOldPassword = (props: Props) => {
    const classes = useStyles();
    const { state, dispatch, user } = props;
    const { resetPasswordButtonDisabled } = state;
    const { resetPassword } = useResetPassword(
        () => resetPasswordOnSuccess(`${t('settings-page.password-change-message')}`),
        () => resetPasswordOnError,
    );
    const { t } = useTranslation();
    const resetPasswordOnSuccess = (text: string) => {
        openSnackbar({
            text,
        })
            .then((result) => {
                if (result.close) {
                    dispatch({ type: PASSWORD_RESET_EMAIL_SENT });
                    // TODO: Snackbar closed. Maybe Accordion should close automatically, as well??;
                }
            })
            .catch((reason) => {
                dispatch({ type: PASSWORD_RESET_EMAIL_SENT });
                // eslint-disable-next-line
                console.log(reason.message);
            });
    };

    const resetPasswordOnError = () => {
        openSnackbar({ text: t('settings-page.something-went-wrong'), severity: 'error' });
    };

    const checkOldPassword = useAuthorizeMe(
        () => {
            dispatch({ type: EMAIL_IS_CORRECT });
            if (user) resetPassword(user.mail);
        },
        () => {
            const helperText = t('settings-page.wrong-old-password');
            dispatch({ type: UPDATE_HELPER_TEXT, payload: { value: helperText } });
        },
    );

    const handleClick = () => {
        const { oldPassword } = state;
        if (user) {
            checkOldPassword.authorizeMe(user.mail, oldPassword);
        }
    };

    return (
        <div className={classes.wrapper}>
            <ButtonSecondary
                type="submit"
                variant="contained"
                onClick={handleClick}
                disabled={resetPasswordButtonDisabled}
            >
                {t('settings-page.reset-old-password')}
            </ButtonSecondary>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: { display: 'flex', justifyContent: 'flex-end', marginBottom: theme.spacing(2) },
    }),
);
