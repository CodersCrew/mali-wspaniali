import React, { ReactElement } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

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
                    <Button onClick={handleClose} color="secondary">
                        {t('close')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
