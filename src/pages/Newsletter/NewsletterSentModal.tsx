import React from 'react';
import { makeStyles, Theme, createStyles, Dialog, DialogContent, DialogActions, Button } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export const NewsletterSentModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const classes = useStyles();

    return (
        <Dialog open onClose={onClose}>
            <DialogContent>
                <CheckCircleIcon className={classes.sentModalIcon} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} autoFocus>
                    Wróc do strony głównej
                </Button>
                <Button onClick={onClose} autoFocus>
                    Wyślij następną wiadomość
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  sentModalIcon: {
    color: '#008aad',
    width: 42,
    height: 42,
  }
}));
