import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    makeStyles,
    createStyles,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    DialogContentText,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { textColor } from '../../colors';
import { Theme } from '../../theme';
import { Button } from '../../components/Button';

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
                    innerText="newsletter.sending-success-modal.back-button"
                />
                <Button
                    id="nextMessageButton"
                    className={classes.sentModalNextMessageButton}
                    onClick={handleButtonClick}
                    innerText="newsletter.sending-success-modal.next-msg-button"
                    variant="text"
                />
            </DialogActions>
        </Dialog>
    );
};

const useStyles = makeStyles((theme: Theme) =>
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
            color: theme.palette.primary.main,
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
            padding: '8px',
            marginBottom: 16,
        },
        sentModalNextMessageButton: {
            maxWidth: 264,
            width: '100%',
            padding: '8px',
            marginBottom: 16,
            boxShadow: '0',
        },
    }),
);
