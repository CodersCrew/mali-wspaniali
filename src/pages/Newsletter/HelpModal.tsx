import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles, Dialog, DialogContent, DialogActions, Button } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

export const HelpModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Dialog open onClose={onClose}>
            <DialogContent className={classes.modalContent}>
                <HelpOutlineIcon className={classes.modalIcon} />
                <span className={classes.modalTextBold}>{t('newsletter.help-modal.type')}</span>
                <p className={classes.modalText}>{t('newsletter.help-modal.type-text')}</p>
                <span className={classes.modalTextBold}>{t('newsletter.help-modal.attachment')}</span>
                <p className={classes.modalText}>{t('newsletter.help-modal.attachment-text')} </p>
            </DialogContent>
            <DialogActions className={classes.modalButtonWrapper}>
                <Button className={classes.modalButton} onClick={onClose} autoFocus>
                    {t('newsletter.help-modal.button')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const useStyles = makeStyles(() =>
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
        },
    }),
);
