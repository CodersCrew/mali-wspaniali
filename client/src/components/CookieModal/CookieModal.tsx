import React, { useState, useEffect } from 'react';
import { makeStyles, IconButton } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import { Theme } from '../../theme/types';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';

function getCookie(name: string) {
    return document.cookie.split(';').filter(cookie => {
        const [k] = cookie.split('=');
        return k.trim() === name;
    })[0];
}
function setCookie(name: string, value: string) {
    document.cookie = `${name}=${value}`;
}
export const CookieModal = () => {
    const classes = useStyles();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { t } = useTranslation();
    const cookiesAccepted = () => {
        const cookie = getCookie('cookies');
        return cookie;
    };
    useEffect(() => {
        cookiesAccepted() ? setModalIsOpen(false) : setModalIsOpen(true);
    }, []);

    return modalIsOpen ? (
        <Box className={classes.modal} zIndex="modal">
            <InfoOutlinedIcon className={classes.modal_icon_info} />
            <div className={classes.modal_textWrapper}>
                <p className={classes.modal_title}>{t('cookies-popup.title')}</p>
                <p className={classes.modal_info}>{t('cookies-popup.content')}</p>
            </div>
            <IconButton
                onClick={() => {
                    setCookie('cookies', 'true');
                    setModalIsOpen(false);
                }}
            >
                <CloseIcon className={classes.modal_icon_close} />
            </IconButton>
        </Box>
    ) : null;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            position: 'absolute',
            width: 'inherit',
            padding: '16px',
            backgroundColor: theme.palette.cookiesModal.light,
            display: 'flex',
            alignItems: 'flex-start',
            letterSpacing: theme.typography.caption.letterSpacing,
        },
        modal_title: {
            margin: '12px 0',
            padding: '0px',
            fontSize: '16px',
            fontWeight: 500,
            fontFamil: 'montserrat',
            height: '22px',
            lineHeight: '22px',
        },
        modal_textWrapper: {
            padding: '0 12px',
        },
        modal_info: {
            fonrSize: '14px',
        },
        modal_icon_info: {
            width: '22px',
            height: '22px',
            margin: '12px 0',
            color: theme.palette.cookiesModal.main,
        },
        modal_icon_close: {
            width: '22px',
            height: '22px',
            color: theme.palette.cookiesModal.dark,
        },
    }),
);
