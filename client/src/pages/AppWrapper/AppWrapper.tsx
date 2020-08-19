import React, { FC, useEffect, useState } from 'react';
import { makeStyles, createStyles, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { ParentSidebar } from '../../components/Menu/Sidebar/ParentSidebar';
// import { Navbar } from '../../components/Menu/Navbar';
import { Theme } from '../../theme/types';
import { getUser } from '../../graphql/userRepository';
import { Me } from '../../graphql/types';
import MWLogo from '../../assets/MALWSP_logo_black.png';
import { LanguageSelector } from './../../components/LanguageSelector';
import { Notifications, Menu as MenuIcon } from '@material-ui/icons';
import { gql, useQuery } from '@apollo/client';
import { NotificationsPanel } from '../../components/Menu/Navbar/NotificationsPanel';
import { AdminSidebar } from '../../components/Menu/Sidebar/AdminSidebar';

export const UserContext = React.createContext<Me | null>(null);

const GET_CART_ITEMS = gql`
    query GetCartItems {
        activePage @client
    }
`;

export const AppWrapper: FC = ({ children }) => {
    const classes = useStyles();
    const [user, setUser] = useState<Me | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const { data } = useQuery(GET_CART_ITEMS);

    const history = useHistory();
    const language = localStorage.getItem('i18nextLng')!;

    const changeLanguage = (lng: string) => {
        moment.locale(lng);

        return i18n.changeLanguage(lng);
    };

    function handleClick(link?: string) {
        setIsOpen(false);

        if (link === 'logout') {
            localStorage.removeItem('token');
            return history.push('/login');
        }

        if (link) {
            history.push(link);
        }
    }

    function handleMobileMenuIconClick() {
        setIsOpen(prev => !prev);
    }

    useEffect(() => {
        getUser().then(({ data }) => setUser(data!.me));
    }, []);

    if (!user) return null;

    return (
        <UserContext.Provider value={user}>
            <div className={classes.root}>
                <AppBar position="fixed" classes={{ root: classes.appbarRoot }}>
                    <Toolbar>
                        <img className={classes.logo} src={MWLogo} alt="Mali Wspaniali" />
                        <IconButton className={classes.menuIcon} onClick={handleMobileMenuIconClick}>
                            <MenuIcon />
                        </IconButton>
                        <div className={classes.menuRoot}>
                            <Typography variant="h6" noWrap>
                                {data.activePage.length > 0 && t(data.activePage[data.activePage.length - 1])}
                            </Typography>
                            <div className={classes.menuSide}>
                                <LanguageSelector language={language} onClick={changeLanguage} />
                                <IconButton
                                    aria-label="notifications"
                                    onClick={() => setIsNotificationsPanelOpen(prev => !prev)}
                                >
                                    <Notifications />
                                </IconButton>
                                {isNotificationsPanelOpen && <NotificationsPanel notifications={user.notifications} />}
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
                {user.role === 'admin' ? (
                    <AdminSidebar
                        user={user}
                        active={data.activePage}
                        open={isOpen}
                        onClose={() => setIsOpen(prev => !prev)}
                        onClick={handleClick}
                    />
                ) : (
                    <ParentSidebar
                        user={user}
                        active={data.activePage}
                        open={isOpen}
                        onClose={() => setIsOpen(prev => !prev)}
                        onClick={handleClick}
                    />
                )}

                <main className={classes.content}>
                    <div className={classes.toolbar}>{children}</div>
                </main>
            </div>
            {/* <div className={classes.background}>
                <div className={classes.container}>
                    <Navbar user={user} />
                    <div className={classes.root}>
                        <Sidebar user={user} extended={isOpen} toggleSidebar={toggleSidebar} />
                        <div className={classes.content}>{children}</div>
                    </div>
                </div>
            </div> */}
        </UserContext.Provider>
    );
};

// eslint-disable-next-line no-shadow
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
            paddingTop: theme.spacing(11),
        },
        toolbar: theme.mixins.toolbar,
        appbarRoot: {
            zIndex: 3000,
        },
        logo: {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(16),
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            },
        },
        // content: {
        //     marginTop: '-40px',
        //     padding: '10px 60px',
        //     [theme.breakpoints.down('sm')]: {
        //         marginLeft: 'auto',
        //         marginRight: 'auto',
        //         marginTop: '60px',
        //         padding: 0,
        //     },
        // },
        menuRoot: {
            display: 'flex',
            justifyContent: 'space-between',
            flex: 1,
            alignItems: 'center',
        },
        menuSide: {
            display: 'flex',
            alignItems: 'center',
        },
        menuIcon: {
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
    }),
);
