import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core/';


const AlertDialog = (props: any) => {

  const handleClose = () => {
    props.setAlert(false);
  };

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>{'Email and password are required'}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialog;
