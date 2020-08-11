import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import clsx from 'clsx';
import { SidebarMenuList } from './SidebarMenuList';
import { SidebarLogoutItem } from './SidebarLogoutItem';
import { SidebarTopItem } from './SidebarTopItem';
import { white } from '../../../colors';
import { LanguageSelector } from '../../LanguageSelector';
import { Me } from '../../../graphql/types';

export interface Props {
    toggleSidebar(): void;
    extended: boolean;
    user: Me | null;
}

export const Sidebar = ({ toggleSidebar, extended, user }: Props) => {
    const classes = useStyles();
    const history = useHistory();

    const language = localStorage.getItem('i18nextLng');

    const sidebarContainerStyle = clsx({ [classes.sidebarContainer]: true, opened: extended });

    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        history.push('/login');
    };

    if (!user) return null;

    return (
        <div className={sidebarContainerStyle}>
            <SidebarTopItem user={user} toggleSidebar={toggleSidebar} extended={extended} />
            <div className={classes.sidebarItemsContainer}>
                <SidebarMenuList user={user} extended={extended} />
                <LanguageSelector language={language} extended={extended} />
                <SidebarLogoutItem handleLogoutClick={handleLogoutClick} extended={extended} />
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
            background: theme.palette.primary.main,

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
