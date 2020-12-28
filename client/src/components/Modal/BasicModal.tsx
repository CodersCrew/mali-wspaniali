import React, { FC } from 'react';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ButtonPrimary } from '../Button';

interface Props {
    isOpen: boolean;
    actionName: string;
    onAction: () => void;
    onClose?: (e: any) => void;
    closeButtonText?: string;
    isCancelButtonVisible?: boolean;
    isColor?: boolean;
}

export const BasicModal: FC<Props> = ({
    isOpen,
    actionName,
    onAction,
    onClose,
    children,
    closeButtonText,
    isCancelButtonVisible,
    isColor,
}) => {
    const { t } = useTranslation();

    return (
        <Dialog maxWidth="md" open={isOpen} onClose={onClose}>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                {isCancelButtonVisible && (
                    <ButtonPrimary variant="text" onClick={onClose} isColor={isColor}>
                        {closeButtonText || t('add-child-modal.cancel')}
                    </ButtonPrimary>
                )}
                <ButtonPrimary variant="text" onClick={onAction}>
                    {actionName}
                </ButtonPrimary>
            </DialogActions>
        </Dialog>
    );
};
