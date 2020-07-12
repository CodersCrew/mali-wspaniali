import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { openDialog, ActionDialog } from '../utils/openDialog';

export type DialogTypes = 'error' | 'warning' | 'info' | 'success';

type AlertDialogProps = {
    description: string;
    title?: string;
    type: DialogTypes;
};

export const openAlertDialog = (props: AlertDialogProps) => {
    return openDialog<AlertDialogProps>(AlertDialog, props);
};

const AlertDialog = ({ type, title, description, onClose }: AlertDialogProps & ActionDialog) => {
    const { t } = useTranslation();

    const titleText = title || t(`alert-dialog.${type}`);

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>{titleText}</DialogTitle>
            <DialogContent>{description}</DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" autoFocus>
                    {t('close')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
