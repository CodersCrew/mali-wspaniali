import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    makeStyles,
    createStyles,
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    DialogTitle,
    DialogContentText,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { mainColor, secondaryColor, white, textColor } from '../../colors';
import { ThemeProvider } from '../../theme/ThemeProvider';

export const NewsletterSentModal: React.FC<{
    onClose: () => void;
    goToAdminPage: () => void;
    resetState: () => void;
}> = ({ onClose, goToAdminPage, resetState }) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (event.currentTarget.id === 'homePageButton') {
            goToAdminPage();
            onClose();
        } else {
            resetState();
            onClose();
        }
    };
    return (
        <ThemeProvider>
            <Dialog open onClose={onClose}>
                <DialogContent className={classes.sentModal}>
                    <CheckCircleIcon className={classes.sentModalIcon} />
                    <DialogTitle disableTypography className={classes.sentModalTitle}>
                        {t('newsletter.sending-success-modal.title')}
                    </DialogTitle>
                    <DialogContentText className={classes.sentModalText}>
                        {t('newsletter.sending-success-modal.content')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.sentModalButtonWrapper}>
                    <Button
                        id="homePageButton"
                        className={classes.sentModalBackButton}
                        onClick={handleButtonClick}
                        autoFocus
                    >
                        {t('newsletter.sending-success-modal.back-button')}
                    </Button>
                    <Button
                        id="nextMessageButton"
                        className={classes.sentModalNextMessageButton}
                        onClick={handleButtonClick}
                        autoFocus
                    >
                        {t('newsletter.sending-success-modal.next-msg-button')}
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
            maxWidth: 264,
            width: '100%',
            backgroundColor: secondaryColor,
            color: white,
            padding: '8px',
            fontWeight: 600,
            lineHeight: 1.2,
            marginBottom: 16,
            fontSize: 14,
            '&:hover': {
                color: secondaryColor,
            },
        },
        sentModalNextMessageButton: {
            maxWidth: 264,
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
