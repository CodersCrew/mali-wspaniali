import React from 'react';
import { DialogContent, DialogTitle, DialogActions, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

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
                <Button color="primary" onClick={closeModal}>
                    {t('close')}
                </Button>
            </DialogActions>
        </>
    );
};
