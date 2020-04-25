import React from 'react';
import { useHistory } from 'react-router-dom';
import { SidebarMenuList } from './SidebarMenuList';
import { Button, makeStyles } from '@material-ui/core';
import { FastForward, PowerSettingsNew } from '@material-ui/icons';
import { mainColor, backgroundColor } from '../../colors';
import { firebase } from '../../firebase/firebase';

interface SidebarPropTypes {
    toggleSidebar(): void;
    openSidebar: boolean;
}

export const Sidebar = ({ toggleSidebar, openSidebar }: SidebarPropTypes) => {
    const classes = useStyles();
    const history = useHistory();
    const {
        sidebarLogoWrapper,
        sidebarSwitch,
        logoutBtnWrapper,
        logoutBtnOpened,
        appVersion,
        logoutBtnClosed,
    } = classes;

    const sidebarContainer = openSidebar ? classes.sidebarContainerOpened : classes.sidebarContainerClosed;
    const sidebarSwitchIcon = openSidebar ? classes.switchIconOpened : classes.switchIconClosed;
    const sidebarItemsWrapper = openSidebar ? classes.menuItemsOpened : classes.menuItemsClosed;

    const handleLogoutClick = () => {
        firebase.auth.handleSignOut();
        history.push('/login');
    };

    return (
        <div className={sidebarContainer}>
            <div className={sidebarLogoWrapper}>
                <img src={require('../../img/mali_wspaniali_logo.png')} alt="mali_wspaniali" />
                <button onClick={toggleSidebar} className={sidebarSwitch}>
                    <FastForward className={sidebarSwitchIcon} />
                </button>
            </div>
            <div className={sidebarItemsWrapper}>
                <SidebarMenuList openSidebar={openSidebar} />
                <div className={logoutBtnWrapper}>
                    {openSidebar ? (
                        <>
                            <Button className={logoutBtnOpened} onClick={handleLogoutClick}>
                                Wyloguj
                            </Button>
                            <span className={appVersion}>Wersja 0.1</span>
                        </>
                    ) : (
                        <Button className={logoutBtnClosed} onClick={handleLogoutClick}>
                            <PowerSettingsNew className={classes.logoutIcon} />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

const useStyles = makeStyles({
    sidebarContainerClosed: {
        padding: '30px 16px 63px 7px',
        color: '#fff',
        zIndex: 9,
        position: 'relative',
        transition: 'width 0.7s',
        height: '100%',
        minWidth: '104px',
        background: mainColor,
    },
    sidebarContainerOpened: {
        padding: '40px 16px 53px 7px',
        height: '100%',
        color: '#fff',
        zIndex: 9,
        position: 'relative',
        width: '240px',
        transition: 'width 0.7s',
        background: mainColor,
    },
    sidebarLogoWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: 62,
    },
    sidebarSwitch: {
        width: '30px',
        height: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        position: 'absolute',
        right: '-28px',
        background: mainColor,
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        color: '#fff',
    },
    switchIconClosed: {
        width: 16,
        height: 16,
        transition: 'transform 0.5s',
    },
    switchIconOpened: {
        width: 16,
        height: 16,
        transform: 'rotate(-180deg)',
        transition: 'transform 0.5s',
    },
    menuItemsClosed: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
    },
    menuItemsOpened: {
        alignItems: 'flex-start',
    },
    menuItemIcon: {
        background: '#fff',
        width: 22,
        height: 22,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '4px',
    },
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
        bottom: '54px',
        padding: '5px 10px',
        lineHeight: '18px',
        fontWeight: 'normal',
        fontSize: '15px',

        '&:hover': {
            color: mainColor,
            backgroundColor,
        },
    },
    appVersion: {
        position: 'absolute',
        bottom: '25px',
        fontSize: '12px',
    },
    logoutIcon: {
        '&:hover': {
            opacity: 0.7,
            borderRadius: '50%',
        },
    },
});
