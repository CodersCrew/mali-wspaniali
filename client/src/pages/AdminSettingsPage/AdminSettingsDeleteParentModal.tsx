import React from 'react';
import { Typography, makeStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { BasicModal } from '../../components/Modal/BasicModal';
import { openDialog, ActionDialog } from '../../utils/openDialog';
import { User } from '../../graphql/types';

export interface SettingsMessageModalProps {
    preventClose: boolean;
    isCancelButtonVisible: boolean;
    parent: User;
}

const AdminSettingsDeleteParent = ({
    onClose,
    makeDecision,
    parent,
    preventClose,
    isCancelButtonVisible,
}: SettingsMessageModalProps & ActionDialog<{ parent: User }>) => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <BasicModal
            closeButtonText={t('parent-settings.modal-delete-account.first-button')}
            actionName={t('parent-settings.modal-delete-account.second-button')}
            isOpen={true}
            onAction={() => makeDecision({ accepted: true, parent })}
            onClose={onClose}
            isCancelButtonVisible={isCancelButtonVisible}
            isActionButtonSecondary
            dialogProps={{ maxWidth: 'xs' }}
        >
            <Typography variant="h4" className={classes.header}>
                {t('parent-settings.modal-delete-account.header')}
            </Typography>
            <Typography variant="body1">{t('parent-settings.modal-delete-account.first-description')}</Typography>
            <Typography variant="body1">
                <strong>{parent.mail}</strong> ?
            </Typography>
            <Typography variant="body1" className={classes.mail}>
                {t('parent-settings.modal-delete-account.second-description')}
            </Typography>
        </BasicModal>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    header: { marginBottom: theme.spacing(2) },
    mail: { marginTop: theme.spacing(2) },
}));

export const openAdminSettingsDeleteParent = (props: SettingsMessageModalProps) => {
    return openDialog<SettingsMessageModalProps>(AdminSettingsDeleteParent, props);
};
