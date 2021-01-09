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
            onClose={() => {
                if (!preventClose) {
                    onClose();
                }
            }}
            isCancelButtonVisible={isCancelButtonVisible}
            secondButtonColor="secondary"
        >
            <div className={classes.modalContent}>
                <Typography variant="h4" className={classes.header}>
                    {t('parent-settings.header')}
                </Typography>
                <Typography variant="body1">{t('parent-settings.modal-delete-account.first-description')}</Typography>
                <Typography variant="body1" className={classes.mailBoldTypography}>
                    {parent.mail} ?
                </Typography>
                <Typography variant="body1">{t('parent-settings.modal-delete-account.second-description')}</Typography>
            </div>
        </BasicModal>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    modalContent: {
        width: '25vw',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    header: { marginBottom: theme.spacing(2) },
    mailBoldTypography: { fontWeight: theme.typography.fontWeightMedium, marginBottom: theme.spacing(2) },
}));

export const openAdminSettingsDeleteParent = (props: SettingsMessageModalProps) => {
    return openDialog<SettingsMessageModalProps>(AdminSettingsDeleteParent, props);
};
