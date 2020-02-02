import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core/';

type AlertDialogProps = {
  setAlert: (value: boolean) => void;
  isOpen: boolean;
};

const dialogTitle = 'Podane hasła nie są takie same';

export const AlertDialog = (props: AlertDialogProps) => {
  const { setAlert, isOpen } = props;

  const handleClose = (): void => {
    setAlert(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
