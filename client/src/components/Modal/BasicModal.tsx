import React, { FC } from 'react';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ButtonPrimary } from '../Button/ButtonPrimary';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const BasicModal: FC<Props> = ({ isOpen, onClose, children }) => {
    const { t } = useTranslation();

    return (
        <Dialog maxWidth="md" open={isOpen} onClose={onClose}>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <ButtonPrimary variant="text" onClick={onClose}>
                    {t('close')}
                </ButtonPrimary>
            </DialogActions>
        </Dialog>
    );
};
