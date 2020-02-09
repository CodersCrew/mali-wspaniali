import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core/';

type AlertDialogProps = {
  setIsAlert: (value: boolean) => void;
  isOpen: boolean;
  message: string;
};

export const AlertDialog = (props: AlertDialogProps) => {
  const { setIsAlert, isOpen, message } = props;

  const handleClose = (): void => {
    setIsAlert(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{message}</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
