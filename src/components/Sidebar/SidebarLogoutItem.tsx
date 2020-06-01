import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { PowerSettingsNew } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { mainColor, backgroundColor } from '../../colors';
import { SidebarLogoutPropTypes } from './types';

export const SidebarLogoutItem = ({ handleLogoutClick, isSidebarOpen }: SidebarLogoutPropTypes) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const logoutBtnStyle = clsx(classes.logoutBtn, isSidebarOpen ? 'opened' : null);
    const logoutBtnContent = isSidebarOpen ? t('menu.logout') : <PowerSettingsNew />;

    return (
        <div className={classes.logoutBtnContainer}>
            <Button className={logoutBtnStyle} onClick={handleLogoutClick}>
                {logoutBtnContent}
            </Button>
        </div>
    );
};

const useStyles = makeStyles({
    logoutBtnContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    logoutBtn: {
        outline: 'none',
        border: 'none',
        background: 'none',
        position: 'absolute',
        bottom: 53,
        color: '#fff',

        '&:hover': {
            background: 'none',
        },

        '& span': {
            '&:hover': {
                opacity: 0.7,
            },
        },

        '&.opened': {
            border: '1px solid #E3E3E8',
            borderRadius: '4px',
            padding: '5px 10px',
            lineHeight: '18px',
            fontWeight: 'normal',
            fontSize: '15px',

            '&:hover': {
                color: mainColor,
                backgroundColor,
            },
        },
    },
});
