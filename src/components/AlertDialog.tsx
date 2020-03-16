import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { openDialog, ActionDialog } from '../utils/openDialog';

export type dialogTypes = 'error' | 'warning' | 'info' | 'success';

type AlertDialogProps = {
  description: string;
  type: dialogTypes;
};

export const openAlertDialog = (props: AlertDialogProps) => {
  return openDialog<AlertDialogProps>(AlertDialog, props);
};

const AlertDialog = ({
  type,
  description,
  onClose,
}: AlertDialogProps & ActionDialog) => {
  const { t } = useTranslation();

  let title;
  switch (type) {
    case 'error':
      title = t('alert-dialog.error');
      break;
    case 'warning':
      title = t('alert-dialog.warning');
      break;
    case 'info':
      title = t('alert-dialog.info');
      break;
    case 'success':
      title = t('alert-dialog.success');
      break;
    default:
      title = t('alert-dialog.info');
  }

  return (
    <Dialog open={true} onClose={onClose}>
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
