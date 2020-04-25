import React from 'react';
import { useHistory } from 'react-router-dom';
import { SidebarMenuList } from './SidebarMenuList';
import { makeStyles } from '@material-ui/core';
import { firebase } from '../../firebase/firebase';
import { SidebarLogoutItem } from './SidebarLogoutItem';
import { SidebarTopItem } from './SidebarTopItem';
import { mainColor } from '../../colors';
import { SidebarPropTypes } from './types';

export const Sidebar = ({ toggleSidebar, openSidebar }: SidebarPropTypes) => {
    const classes = useStyles();
    const history = useHistory();

    const sidebarContainer = openSidebar ? classes.sidebarContainerOpened : classes.sidebarContainerClosed;
    const sidebarItemsWrapper = openSidebar ? classes.menuItemsOpened : classes.menuItemsClosed;

    const handleLogoutClick = () => {
        firebase.auth.handleSignOut();
        history.push('/login');
    };

    return (
        <div className={sidebarContainer}>
            <SidebarTopItem toggleSidebar={toggleSidebar} openSidebar={openSidebar} />
            <div className={sidebarItemsWrapper}>
                <SidebarMenuList openSidebar={openSidebar} />
                <SidebarLogoutItem handleLogoutClick={handleLogoutClick} openSidebar={openSidebar} />
            </div>
        </div>
    );
};

const useStyles = makeStyles({
    sidebarContainerClosed: {
        padding: '30px 16px 53px 7px',
        color: '#fff',
        zIndex: 9,
        position: 'relative',
        transition: 'width 0.7s',
        height: 'calc(100vh-20px)',
        minWidth: '104px',
        background: mainColor,
    },
    sidebarContainerOpened: {
        padding: '30px 16px 53px 7px',
        height: 'calc(100vh-20px)',
        color: '#fff',
        zIndex: 9,
        position: 'relative',
        width: '240px',
        transition: 'width 0.7s',
        background: mainColor,
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
});
