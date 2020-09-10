import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, IconButton } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import { getCookie, setCookie } from '../../utils/cookies';
import { Theme } from '../../theme/types';

const ModalProps = { zIndex: 'modal' };

export const CookieModal = () => {
    const classes = useStyles();
    const [IsOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();
    const cookiesAccepted = () => getCookie('cookies');

    useEffect(() => setIsOpen(!cookiesAccepted()), []);

    if (IsOpen)
        return (
            <Box className={classes.modal} zIndex={ModalProps.zIndex}>
                <InfoOutlinedIcon className={classes.modalIconInfo} />
                <div className={classes.modalTextWrapper}>
                    <p className={classes.modalTitle}>{t('cookies-popup.title')}</p>
                    <p className={classes.modalInfo}>{t('cookies-popup.content')}</p>
                </div>
                <IconButton
                    onClick={() => {
                        setCookie('cookies', 'true');
                        setIsOpen(false);
                    }}
                >
                    <CloseIcon className={classes.modalIconClose} />
                </IconButton>
            </Box>
        );

    return <React.Fragment></React.Fragment>;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            position: 'fixed',
            width: 'inherit',
            padding: theme.spacing(2),
            backgroundColor: theme.palette.cookiesModal.light,
            display: 'flex',
            alignItems: 'flex-start',
            letterSpacing: theme.typography.caption.letterSpacing,
        },
        modalTitle: {
            margin: '15px 0',
            padding: '0px',
            fontSize: theme.typography.subtitle1.fontSize,
            fontWeight: theme.typography.subtitle1.fontWeight,
            height: theme.spacing(3),
            lineHeight: theme.typography.subtitle1.lineHeight,
            letterSpacing: theme.typography.subtitle1.letterSpacing,
        },
        modalTextWrapper: {
            padding: '0 12px',
        },
        modalInfo: {
            fontSize: '14px',
        },
        modalIconInfo: {
            width: theme.spacing(3),
            height: theme.spacing(3),
            margin: '12px 0',
            color: theme.palette.cookiesModal.main,
        },
        modalIconClose: {
            width: theme.spacing(3),
            height: theme.spacing(3),
            color: theme.palette.cookiesModal.dark,
        },
    }),
);
