import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { textColor } from '../../colors';
import { Theme } from '../../theme';
import { TwoActionsModal } from '../../components/Modal/TwoActionsModal';

export const NewsletterSentModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    goToAdminPage: () => void;
    resetState: () => void;
}> = ({ isOpen, onClose, goToAdminPage, resetState }) => {
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
        <TwoActionsModal
            isOpen={isOpen}
            onClose={onClose}
            upperButtonOnClick={handleButtonClick}
            upperButtonText={t('newsletter.sending-success-modal.back-button')}
            lowerButtonOnClick={handleButtonClick}
            lowerButtonText={t('newsletter.sending-success-modal.next-msg-button')}
        >
            <div className={classes.sentModal}>
                <CheckCircleIcon className={classes.sentModalIcon} />
                <div className={classes.sentModalTitle}>{t('newsletter.sending-success-modal.title')}</div>
                <div className={classes.sentModalText}>{t('newsletter.sending-success-modal.content')}</div>
            </div>
        </TwoActionsModal>
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
    }),
);
