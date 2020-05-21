import React from 'react';
import { makeStyles, Theme, createStyles, Dialog, DialogContent, DialogActions, Button } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

export const HelpModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const classes = useStyles();

    return (
        <Dialog open onClose={onClose}>
            <DialogContent className={classes.modalContent}>
                <HelpOutlineIcon className={classes.modalIcon} />
                <span className={classes.modalTextBold}>Rodzaj Newslettera</span>
                <p className={classes.modalText}>
                    Wybierz rodzaj odpowiadający tematowi Twojej wiadomości. Newsletter zostanie przypisany do danej
                    kategorii, dzięki czemu łatwiej go odnajdziesz w Archiwum newsletterów.{' '}
                </p>
                <span className={classes.modalTextBold}>Załączniki</span>
                <p className={classes.modalText}>
                    Aby prawidłowo dodać załącznik, musi on być zapisany w formacie: .pdf, .xlsx, .doc, .txt, blabla
                </p>
            </DialogContent>
            <DialogActions className={classes.modalButtonWrapper}>
                <Button className={classes.modalButton} onClick={onClose} autoFocus>
                    Rozumiem
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modalIcon: {
            color: '#008aad',
            width: 24,
            height: 24,
            position: 'absolute',
            top: 25,
            left: 20,
        },
        modalContent: {
            padding: '29px 54px 0',
            '&:first-child': {
                paddingTop: 29,
            },
        },
        modalTextBold: {
            display: 'block',
            fontSize: 15,
            fontWeight: 'bold',
            color: '#1d1d1d',
            fontFamily: 'Montserrat',
            lineHeight: 1,
            marginBottom: 15,
        },
        modalText: {
            marginTop: 0,
            fontSize: 15,
            lineHeight: 1.2,
            color: '#1d1d1b',
            fontFamily: 'Montserrat',
            '&:first-of-type': {
                marginBottom: 30,
            },
            '&:last-of-type': {
                marginBottom: 8,
            },
        },
        modalButton: {
            fontFamily: 'Montserrat',
            fontSize: 14,
            fontWeight: 'bold',
            color: '#2196f3',
        },
        modalButtonWrapper: {
          paddingRight: 17,
        }
    }),
);
