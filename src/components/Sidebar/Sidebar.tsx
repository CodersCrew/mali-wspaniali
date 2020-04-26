import React from 'react';
import { useHistory } from 'react-router-dom';
import { SidebarMenuList } from './SidebarMenuList';
import { makeStyles } from '@material-ui/core';
import { firebase } from '../../firebase/firebase';
import { SidebarLogoutItem } from './SidebarLogoutItem';
import { SidebarTopItem } from './SidebarTopItem';
import { mainColor } from '../../colors';
import { SidebarPropTypes } from './types';
import clsx from 'clsx';

export const Sidebar = ({ toggleSidebar, openSidebar }: SidebarPropTypes) => {
    const classes = useStyles();
    const history = useHistory();

    const sidebarContainerStyle = clsx(classes.sidebarContainer, openSidebar ? 'opened' : null);

    const handleLogoutClick = () => {
        firebase.auth.handleSignOut();
        history.push('/login');
    };

    return (
        <div className={sidebarContainerStyle}>
            <SidebarTopItem toggleSidebar={toggleSidebar} openSidebar={openSidebar} />
            <div className={classes.sidebarItemsContainer}>
                <SidebarMenuList openSidebar={openSidebar} />
                <SidebarLogoutItem handleLogoutClick={handleLogoutClick} openSidebar={openSidebar} />
            </div>
        </div>
    );
};

const useStyles = makeStyles({
    sidebarContainer: {
        padding: '30px 20px 53px 10px',
        color: '#fff',
        zIndex: 9,
        position: 'relative',
        height: 'calc(100vh-20px)',
        minWidth: '104px',
        background: mainColor,

        '&.opened': {
            width: '240px',
        },
    },
    sidebarItemsContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
    },
});
