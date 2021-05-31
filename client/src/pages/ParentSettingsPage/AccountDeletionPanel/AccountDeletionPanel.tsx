import { Typography, Box, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { useGetMe } from '../../../operations/mutations/User/useGetMe';
import { openSettingsModal } from '../../../components/AccountDeletionPanel/ModalSettings';
import { openSnackbar } from '../../../components/Snackbar/openSnackbar';

import { ButtonSendMessage } from '../ChangePasswordPanel/ChangepasswordPanelFormControls/ButtonSendMessage';

const useStyles = makeStyles((theme) => ({
    header: { color: theme.palette.text.primary },
    description: {
        color: theme.palette.text.secondary,
        margin: theme.spacing(1, 0, 2),
    },
}));

export const AccountDeletionPanel = () => {
    const { t } = useTranslation();
    const { user } = useGetMe();
    const classes = useStyles();

    if (!user) return null;

    return (
        <Box>
            <Typography className={classes.header} variant={'body1'}>
                {t('settings-page.delete-account-header')}
            </Typography>
            <Typography color="secondary" variant={'subtitle2'} className={classes.description}>
                {t('settings-page.delete-account-content')}
            </Typography>
            <ButtonSendMessage
                handleClick={() => {
                    openSettingsModal({
                        preventClose: false,
                        isCancelButtonVisible: true,
                        user,
                    }).then((result) => {
                        if (!result.close) openSnackbar({ text: t('settings-modal.snackBar-message') });
                    });
                }}
            />
        </Box>
    );
};
