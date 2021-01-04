import React from 'react';
import { Typography, makeStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { TwoActionsModal } from '../../components/Modal/TwoActionsModal';

interface Props {
    onClose: () => void;
    isOpen: boolean;
    mail: string;
}

export const AdminSettingsDeleteParent = ({ onClose, isOpen, mail }: Props) => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <TwoActionsModal
            lowerButtonOnClick={onClose}
            upperButtonOnClick={() => {
                console.log('onDelete(mail) to do later');
            }}
            lowerButtonText={t('parent-settings.modal-delete-account.first-button')}
            upperButtonText={t('parent-settings.modal-delete-account.second-button')}
            isOpen={isOpen}
            onClose={onClose}
            color="secondary"
        >
            <div className={classes.modalContent}>
                <Typography variant="h4" className={classes.header}>
                    {t('parent-settings.header')}
                </Typography>
                <Typography variant="body1">{t('parent-settings.modal-delete-account.first-description')}</Typography>
                <Typography variant="body1" className={classes.email}>
                    {mail} ?
                </Typography>
                <Typography variant="body1" className={classes.content}>
                    {t('parent-settings.modal-delete-account.second-description')}
                </Typography>
            </div>
        </TwoActionsModal>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    modalContent: {
        width: 450,
    },
    email: { fontWeight: theme.typography.button.fontWeight },
    header: { marginBottom: theme.spacing(2) },
    content: {
        marginTop: theme.spacing(2),
    },
}));
