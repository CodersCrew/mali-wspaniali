import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import clsx from 'clsx';
import { SidebarMenuList } from './SidebarMenuList';
import { SidebarLogoutItem } from './SidebarLogoutItem';
import { SidebarTopItem } from './SidebarTopItem';
import { handleSignOut } from '../../queries/authQueries';
import { mainColor, white } from '../../colors';
import { SidebarPropTypes } from './types';

export const Sidebar = ({ toggleSidebar, isSidebarOpen }: SidebarPropTypes) => {
    const classes = useStyles();
    const history = useHistory();

    const sidebarContainerStyle = clsx(classes.sidebarContainer, isSidebarOpen ? 'opened' : null);

    const handleLogoutClick = () => {
        handleSignOut();
        history.push('/login');
    };

    return (
        <div className={sidebarContainerStyle}>
            <SidebarTopItem toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
            <div className={classes.sidebarItemsContainer}>
                <SidebarMenuList isSidebarOpen={isSidebarOpen} />
                <SidebarLogoutItem handleLogoutClick={handleLogoutClick} isSidebarOpen={isSidebarOpen} />
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sidebarContainer: {
            padding: '30px 20px 53px 10px',
            color: white,
            zIndex: 9,
            position: 'fixed',
            height: '100vh',
            minWidth: '104px',
            width: '104px',
            transition: 'all 0.4s',
            background: mainColor,

            '&.opened': {
                minWidth: '240px',
                width: '240px',
                transition: 'all 0.5s',
            },

            [theme.breakpoints.down('sm')]: {
                display: 'none',
            },
        },
        sidebarItemsContainer: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            alignItems: 'center',
        },
    }),
);
