import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

interface ModalProps {
    isOpen: boolean;
    handleClose: () => void;
    dialogTitle?: string;
    dialogSubtitle?: string;
    children?: any;
}

export const Modal = ({ isOpen, handleClose, dialogTitle, dialogSubtitle, children }: ModalProps) => {
    const { t } = useTranslation();

    return (
        <>
            <Dialog fullWidth maxWidth="md" open={isOpen} onClose={handleClose}>
                <DialogTitle>{dialogTitle && t(dialogTitle)}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogSubtitle}</DialogContentText>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        {t('close')}
                    </Button>
                    ;
                </DialogActions>
            </Dialog>
        </>
    );
};
