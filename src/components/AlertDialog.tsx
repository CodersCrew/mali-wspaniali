import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { openDialog, ActionDialog } from '../utils/openDialog';

export type DialogTypes = 'error' | 'warning' | 'info' | 'success';

type AlertDialogProps = {
    description: string;
    type: DialogTypes;
};

export const openAlertDialog = (props: AlertDialogProps) => {
    return openDialog<AlertDialogProps>(AlertDialog, props);
};

const AlertDialog = ({ type, description, onClose }: AlertDialogProps & ActionDialog) => {
    const { t } = useTranslation();

    const title = t(`alert-dialog.${type}`);

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{description}</DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};
