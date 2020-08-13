import React, { ReactElement } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ButtonPrimary } from './Button/ButtonPrimary';

interface ModalProps {
    isOpen: boolean;
    handleClose: () => void;
    dialogTitle?: string;
    dialogContentText?: string;
    children?: ReactElement;
}

export const Modal = ({ isOpen, handleClose, dialogTitle, dialogContentText, children }: ModalProps) => {
    const { t } = useTranslation();

    return (
        <>
            <Dialog maxWidth="md" open={isOpen} onClose={handleClose}>
                <DialogTitle>{dialogTitle && t(dialogTitle)}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogContentText}</DialogContentText>
                    {children}
                </DialogContent>
                <DialogActions>
                    <ButtonPrimary variant="text" onClick={handleClose}>
                        {t('close')}
                    </ButtonPrimary>
                </DialogActions>
            </Dialog>
        </>
    );
};
