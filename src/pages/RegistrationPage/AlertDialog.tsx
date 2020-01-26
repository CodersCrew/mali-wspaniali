import React, { ReactElement, SetStateAction, ComponentState } from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core/';

type AlertDialogProps = {
  setAlert: SetStateAction<ComponentState>;
  open: boolean;
};

const AlertDialog = (props: AlertDialogProps): ReactElement => {
  const { setAlert, open } = props;

  const handleClose = (): void => {
    setAlert(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{'Email and password are required'}</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
