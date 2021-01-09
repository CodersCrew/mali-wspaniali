import React, { FC } from 'react';
import { Dialog, DialogActions, DialogContent, DialogProps } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { ButtonPrimary, ButtonSecondary, ButtonDefault } from '../Button';

interface Props {
    isOpen: boolean;
    actionName: string;
    onAction: () => void;
    onClose?: (e: any) => void;
    closeButtonText?: string;
    isCancelButtonVisible?: boolean;
    isActionButtonSecondary?: boolean;
    dialogProps?: Partial<DialogProps>;
}

export const BasicModal: FC<Props> = ({
    isOpen,
    actionName,
    onAction,
    onClose,
    children,
    closeButtonText,
    isCancelButtonVisible,
    isActionButtonSecondary,
    dialogProps,
}) => {
    const { t } = useTranslation();

    const ActionButton = isActionButtonSecondary ? ButtonSecondary : ButtonPrimary;

    return (
        <Dialog maxWidth="md" open={isOpen} onClose={onClose} {...dialogProps}>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                {isCancelButtonVisible && (
                    <ButtonDefault variant="text" onClick={onClose} color="inherit">
                        {closeButtonText || t('add-child-modal.cancel')}
                    </ButtonDefault>
                )}
                <ActionButton variant="text" onClick={onAction}>
                    {actionName}
                </ActionButton>
            </DialogActions>
        </Dialog>
    );
};
