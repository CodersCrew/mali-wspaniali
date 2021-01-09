import React from 'react';
import { Typography, makeStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { BasicModal } from '../../components/Modal/BasicModal';
import { openDialog, ActionDialog } from '../../utils/openDialog';
import { User } from '../../graphql/types';

export interface SettingsMessageModalProps {
    preventClose: boolean;
    isCancelButtonVisible: boolean;
    onClose: () => void;
    isOpen: boolean;
    parent: User;
}

const AdminSettingsDeleteParent = ({
    onClose,
    makeDecision,
    isOpen,
    parent,
    preventClose,
    isCancelButtonVisible,
}: SettingsMessageModalProps & ActionDialog<{ parent: User }>) => {
    const { t } = useTranslation();
    const classes = useStyles();
    console.log('parent', parent);

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
                <Typography variant="body1">{parent.mail} ?</Typography>
                <Typography variant="body1" className={classes.content}>
                    {t('parent-settings.modal-delete-account.second-description')}
                </Typography>
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
    content: {
        marginTop: theme.spacing(2),
    },
}));

export const openAdminSettingsDeleteParent = (props: any) => {
    return openDialog<any>(AdminSettingsDeleteParent, props);
};
