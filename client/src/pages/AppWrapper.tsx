import React, { FC, useEffect, useState } from 'react';
import { makeStyles, createStyles, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useQuery } from '@apollo/client';

import { ParentSidebar } from '../components/Menu/Sidebar/ParentSidebar';
import { Theme } from '../theme/types';

import { getUser } from '../graphql/userRepository';
import { Me } from '../graphql/types';
import { AdminSidebar } from '../components/Menu/Sidebar/AdminSidebar';
import { useBreakpoints } from '../queries/useBreakpoints';
import { Navbar } from '../components/Menu/Navbar/Navbar';
import { ACTIVE_PAGE } from '../graphql/localFields';
import { AddChildModal } from '../components/AddChildModal/AddChildModal';

export const UserContext = React.createContext<Me | null>(null);

export const AppWrapper: FC = ({ children }) => {
    const classes = useStyles();
    const [user, setUser] = useState<Me | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const { i18n } = useTranslation();
    const { data: ActivePageState } = useQuery(ACTIVE_PAGE);
    const device = useBreakpoints();

    const history = useHistory();
    const language = localStorage.getItem('i18nextLng')!;

    const handleLanguageChange = (lng: string) => {
        moment.locale(lng);

        return i18n.changeLanguage(lng);
    };

    function handleClick(link?: string) {
        setIsOpen(false);

        if (link === 'logout') {
            localStorage.removeItem('token');

            return history.push('/login');
        }

        if (link) return history.push(link);
    }

    function handleSidebarToggle() {
        setIsOpen(prev => !prev);
    }

    useEffect(() => {
        getUser().then(({ data }) => setUser(data!.me));
    }, []);

    if (!user) return null;

    return (
        <UserContext.Provider value={user}>
            <Box display="flex">
                <Navbar
                    device={device}
                    activePage={ActivePageState.activePage}
                    language={language}
                    notifications={user.notifications}
                    onLanguageChange={handleLanguageChange}
                    onSidebarToggle={handleSidebarToggle}
                />
                {user.role === 'admin' ? (
                    <AdminSidebar
                        user={user}
                        active={ActivePageState.activePage}
                        open={isOpen}
                        onClose={handleSidebarToggle}
                        onClick={handleClick}
                    />
                ) : (
                    <ParentSidebar
                        user={user}
                        active={ActivePageState.activePage}
                        open={isOpen}
                        onClose={handleSidebarToggle}
                        onClick={handleClick}
                    />
                )}

                <main className={classes.content}>
                    <div className={classes.toolbar}>{children}</div>
                </main>
                {user.role !== 'admin' ? (
                    <AddChildModal
                        handleSubmit={() => {
                            console.log('handleSubmit');
                        }}
                    />
                ) : null}
            </Box>
        </UserContext.Provider>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            paddingTop: theme.spacing(8),
            maxWidth: '100%',
        },
        toolbar: theme.mixins.toolbar,
    }),
);
