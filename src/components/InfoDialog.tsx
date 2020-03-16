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

type InfoDialogProps = {
  description: string;
  type: dialogTypes;
};

export const openInfoDialog = (props: InfoDialogProps) => {
  return openDialog<InfoDialogProps>(InfoDialog, props);
};

const InfoDialog = ({
  type,
  description,
  onClose,
}: InfoDialogProps & ActionDialog) => {
  const { t } = useTranslation();

  let title;
  switch (type) {
    case 'error':
      title = t('info-dialog.error');
      break;
    case 'warning':
      title = t('info-dialog.warning');
      break;
    case 'info':
      title = t('info-dialog.info');
      break;
    case 'success':
      title = t('info-dialog.success');
      break;
    default:
      title = t('info-dialog.info');
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
