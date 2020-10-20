import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { ButtonSecondary } from '../../../../components/Button';
import { Me } from '../../../../graphql/types';
import { useAuthorizeMe } from '../../../../operations/mutations/User/autthorizeMe';
import {
    ChangePasswordPanelComponentsProps,
    EMAIL_IS_CORRECT,
    UPDATE_HELPER_TEXT,
} from '../ChangePasswordPanelReducer';
import { openAlertDialog } from '../../../../components/AlertDialog';

interface Props extends ChangePasswordPanelComponentsProps {
    user: Me | null;
}

export const ButtonValidateOldPassword = (props: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { dispatch } = props;

    const checkOldPassword = useAuthorizeMe(
        () => {
            dispatch({ type: EMAIL_IS_CORRECT });
            // TODO: zmienić albo usunąć
            openAlertDialog({ description: 'do resetu hasła droga wolna!', title: 'Yupiii!', type: 'success' });
        },
        () => {
            const helperText = t('settings-page.wrong-old-password');
            dispatch({ type: UPDATE_HELPER_TEXT, payload: { value: helperText } });
        },
    );

    const handleClick = () => {
        const { state, user } = props;
        const { oldPassword } = state;
        if (user) {
            checkOldPassword.authorizeMe(user.mail, oldPassword);
        }
    };

    return (
        <div className={classes.wrapper}>
            <ButtonSecondary type="submit" variant="contained" onClick={handleClick}>
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
