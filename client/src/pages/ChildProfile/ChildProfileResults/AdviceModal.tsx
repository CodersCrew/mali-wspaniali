import React from 'react';
import { DialogContent, DialogTitle, DialogActions } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ButtonPrimary } from '../../../components/Button';

interface Props {
    content: string;
    closeModal: () => void;
}

export const AdviceModal = ({ content, closeModal }: Props) => {
    const { t } = useTranslation();

    return (
        <>
            <DialogTitle>
                {t('child-profile.advice')}
            </DialogTitle>
            <DialogContent>{content}</DialogContent>
            <DialogActions>
                <ButtonPrimary variant="text" onClick={closeModal} innerText={t('close')} />
            </DialogActions>
        </>
    );
};
