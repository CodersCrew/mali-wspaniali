import React from 'react';
import { Typography, Box, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useGetMe } from '../../../operations/mutations/User/useGetMe';

import { ButtonSendMessage } from '../ChangePasswordPanel/ChangepasswordPanelFormControls/ButtonSendMessage';
import { openSettingsModal } from '../../../components/AccountDeletionPanel/ModalSettings';

const useStyles = makeStyles(theme => ({
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
                    }).then(result => {
                        // Add logic to send email
                        console.log('result', result);
                    });
                }}
            />
        </Box>
    );
};
