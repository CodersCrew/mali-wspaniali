import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { PowerSettingsNew } from '@material-ui/icons';
import { mainColor, backgroundColor } from '../../colors';
import { SidebarLogoutPropTypes } from './types';

export const SidebarLogoutItem = ({ handleLogoutClick, openSidebar }: SidebarLogoutPropTypes) => {
    const classes = useStyles();

    const logoutBtnStyle = openSidebar ? classes.logoutBtnOpened : classes.logoutBtnClosed;
    const logoutBtnContent = openSidebar ? 'Wyloguj' : <PowerSettingsNew className={classes.logoutIcon} />;

    return (
        <div className={classes.logoutBtnWrapper}>
            <Button className={logoutBtnStyle} onClick={handleLogoutClick}>
                {logoutBtnContent}
            </Button>
        </div>
    );
};

const useStyles = makeStyles({
    logoutBtnWrapper: {
        display: 'flex',
        justifyContent: 'center',
    },
    logoutBtnClosed: {
        outline: 'none',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        position: 'absolute',
        bottom: 53,
        color: '#fff',

        '&:hover': {
            outline: 'none',
            border: 'none',
            background: 'none',
        },
    },
    logoutBtnOpened: {
        border: '1px solid #E3E3E8',
        borderRadius: '4px',
        color: '#fff',
        position: 'absolute',
        bottom: 53,
        padding: '5px 10px',
        lineHeight: '18px',
        fontWeight: 'normal',
        fontSize: '15px',

        '&:hover': {
            color: mainColor,
            backgroundColor,
        },
    },
    logoutIcon: {
        '&:hover': {
            opacity: 0.7,
            borderRadius: '50%',
        },
    },
});
