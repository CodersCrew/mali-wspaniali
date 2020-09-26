import React, { FC } from 'react';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { ButtonPrimary } from '../Button/ButtonPrimary';

interface Props {
    isOpen: boolean;
    actionName: string;
    onAction: () => void;
    onClose?: () => void;
}

export const BasicModal: FC<Props> = ({ isOpen, actionName, onAction, onClose, children }) => {
    return (
        <Dialog maxWidth="md" open={isOpen} onClose={onClose}>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <ButtonPrimary variant="text" onClick={onAction}>
                    {actionName}
                </ButtonPrimary>
            </DialogActions>
        </Dialog>
    );
};
