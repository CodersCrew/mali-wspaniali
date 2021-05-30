import React from 'react';
import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, IconButton, Typography, Paper } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import { getCookie, setCookie } from '../../utils/cookies';
import { Theme } from '../../theme/types';

export const CookieModal = () => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = React.useState(() => !getCookie('cookies'));
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <Box className={classes.modal} zIndex="modal">
            <Paper classes={{ root: classes.wrapper }}>
                <InfoOutlinedIcon className={classes.modalIconInfo} />
                <Box px="12px" pt="4px" mr={6}>
                    <Typography variant="body2">
                        <Trans
                            i18nKey="cookies-popup.content"
                            components={{
                                Link: (
                                    <Link className={classes.modalLink} to="/cookies">
                                        {t('cookies-popup.link')}
                                    </Link>
                                ),
                            }}
                        />
                    </Typography>
                </Box>
                <div className={classes.acceptButton}>
                    <IconButton
                        onClick={() => {
                            setCookie('cookies', 'true');
                            setIsOpen(false);
                        }}
                    >
                        <CloseIcon className={classes.modalIconClose} />
                    </IconButton>
                </div>
            </Paper>
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
            maxWidth: '968px',
        },
        wrapper: {
            color: '#0D3C61',
            padding: theme.spacing(2),
            display: 'flex',
            border: `1px solid ${theme.palette.info.light}`,
        },
        modalIconInfo: {
            width: theme.spacing(3),
            height: theme.spacing(3),
            color: '#255071',
        },
        modalIconClose: {
            width: theme.spacing(3),
            height: theme.spacing(3),
            color: '#0D3C61',
        },
        modalLink: {
            textDecoration: 'none',
            color: theme.palette.info.main,
        },
        acceptButton: {
            position: 'absolute',
            right: 0,
            top: 0,
        },
    }),
);
