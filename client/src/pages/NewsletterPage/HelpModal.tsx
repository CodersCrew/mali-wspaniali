import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { mainColor, textColor } from '../../colors';
import { BasicModal } from '../../components/Modal/BasicModal';

export const HelpModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <BasicModal isOpen={true} onClose={onClose} onAction={onClose} actionName={t('close')}>
            <div className={classes.modalContent}>
                <HelpOutlineIcon className={classes.modalIcon} />
                <span className={classes.modalTextBold}>{t('newsletter.help-modal.type')}</span>
                <p className={classes.modalText}>{t('newsletter.help-modal.type-text')}</p>
                <span className={classes.modalTextBold}>{t('newsletter.help-modal.attachment')}</span>
                <p className={classes.modalText}>{t('newsletter.help-modal.attachment-text')} </p>
            </div>
        </BasicModal>
    );
};

const useStyles = makeStyles(() =>
    createStyles({
        modalIcon: {
            color: mainColor,
            width: 24,
            height: 24,
            position: 'absolute',
            top: 45,
            left: 40,
        },
        modalContent: {
            padding: '29px 54px 0',
            '&:first-child': {
                paddingTop: 29,
            },
            fontFamily: 'Montserrat',
        },
        modalTextBold: {
            display: 'block',
            fontSize: 15,
            fontWeight: 'bold',
            color: textColor,
            lineHeight: 1,
            marginBottom: 15,
        },
        modalText: {
            marginTop: 0,
            fontSize: 15,
            lineHeight: 1.2,
            color: textColor,
            '&:first-of-type': {
                marginBottom: 30,
            },
            '&:last-of-type': {
                marginBottom: 8,
            },
        },
    }),
);
