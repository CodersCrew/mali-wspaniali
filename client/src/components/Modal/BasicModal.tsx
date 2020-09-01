import React, { ReactElement } from 'react';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ButtonPrimary } from '../Button/ButtonPrimary';

interface Props {
    isOpen: boolean;
    handleClose: () => void;
    children?: ReactElement;
}

export const BasicModal = ({ isOpen, handleClose, children }: Props) => {
    const { t } = useTranslation();

    return (
        <Dialog maxWidth="md" open={isOpen} onClose={handleClose}>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                <ButtonPrimary variant="text" onClick={handleClose}>
                    {t('close')}
                </ButtonPrimary>
            </DialogActions>
        </Dialog>
    );
};
