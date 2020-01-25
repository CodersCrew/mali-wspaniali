import React, { ReactElement } from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core/';

type AlertDialogProps = {
  setAlert: Function
  open: boolean
}

const AlertDialog = (props: AlertDialogProps): ReactElement => {
  const { setAlert, open } = props;

  const handleClose = (): void => {
    setAlert(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{'Email and password are required'}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
