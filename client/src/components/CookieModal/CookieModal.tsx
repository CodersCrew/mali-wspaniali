import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();
    const cookiesAccepted = () => getCookie('cookies');
    const link = t('cookies-popup.link');
    const content = t('cookies-popup.content').split(link);

    useEffect(() => setIsOpen(!cookiesAccepted()), []);

    if (!isOpen) return null;

    return (
        <Box className={classes.modal} zIndex={ModalProps.zIndex}>
            <div className={classes.wrapper}>
                <InfoOutlinedIcon className={classes.modalIconInfo} />
                <div className={classes.modalTextWrapper}>
                    <p className={classes.modalInfo}>
                        {content[0]}
                        <Link className={classes.modalLink} to="/cookies">
                            {link}
                        </Link>
                        {content[1]}
                    </p>
                </div>
                <IconButton
                    onClick={() => {
                        setCookie('cookies', 'true');
                        setIsOpen(false);
                    }}
                >
                    <CloseIcon className={classes.modalIconClose} />
                </IconButton>
            </div>
        </Box>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            margin: '16px',
            width: 'calc(100% - 32px)',
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(calc(-50% - 16px))',
            background: 'transparent',
            maxWidth: '968px',
        },
        wrapper: {
            color: theme.palette.cookiesModal.contrastText,
            flexGrow: 1,
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
        modalLink: {
            textDecoration: 'none',
            color: theme.palette.info.main,
        },
    }),
);
