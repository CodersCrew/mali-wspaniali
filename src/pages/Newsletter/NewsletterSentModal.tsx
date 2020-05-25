import React from 'react';
import {
    makeStyles,
    createStyles,
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    DialogTitle,
    DialogContentText,
    ThemeProvider,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { theme } from '../../theme';
import { mainColor, secondaryColor, white, textColor } from '../../colors';

export const NewsletterSentModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <Dialog open onClose={onClose}>
                <DialogContent className={classes.sentModal}>
                    <CheckCircleIcon className={classes.sentModalIcon} />
                    <DialogTitle disableTypography className={classes.sentModalTitle}>
                        Gotowe
                    </DialogTitle>
                    <DialogContentText className={classes.sentModalText}>
                        Twoja wiadomosc zostala wyslana do adresatow.
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.sentModalButtonWrapper}>
                    <Button className={classes.sentModalBackButton} onClick={onClose} autoFocus>
                        Wróc do strony głównej
                    </Button>
                    <Button className={classes.sentModalNextMessageButton} onClick={onClose} autoFocus>
                        Wyślij następną wiadomość
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
};

const useStyles = makeStyles(() =>
    createStyles({
        sentModal: {
            textAlign: 'center',
            padding: '30px 94px 0',
            width: 420,
        },
        sentModalTitle: {
            fontSize: 21,
            lineHeight: 1.2,
            margin: 0,
            color: textColor,
            padding: 0,
            marginBottom: 18,
            fontWeight: 500,
        },
        sentModalIcon: {
            color: mainColor,
            width: 48,
            height: 48,
            marginBottom: 8,
        },
        sentModalText: {
            color: textColor,
            fontSize: 15,
            lineHeight: 1.2,
            marginBottom: 30,
        },
        sentModalButtonWrapper: {
            padding: '0 78px',
            display: 'flex',
            flexDirection: 'column',
            justifyItems: 'center',
            '& > :not(:first-child)': {
                marginLeft: 0,
            },
        },
        sentModalBackButton: {
            width: '100%',
            backgroundColor: secondaryColor,
            color: white,
            padding: '8px',
            fontWeight: 600,
            lineHeight: 1.2,
            marginBottom: 16,
            fontSize: 14,
        },
        sentModalNextMessageButton: {
            width: '100%',
            backgroundColor: white,
            color: secondaryColor,
            fontWeight: 600,
            lineHeight: 1.2,
            fontSize: 14,
            padding: '8px',
            marginBottom: 16,
        },
    }),
);
