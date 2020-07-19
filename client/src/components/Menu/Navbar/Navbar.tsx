import React, { useState } from 'react';
import { Avatar, IconButton, makeStyles, Theme, createStyles, Badge } from '@material-ui/core/';
import { Notifications } from '@material-ui/icons/';
import { Link } from 'react-router-dom';
import { User } from '../../../firebase/firebase';
import { secondaryColor, white, textColor } from '../../../colors';
import { useSubscribed } from '../../../hooks/useSubscribed';
import { OnSnapshotCallback } from '../../../firebase/userRepository';
import { getChildrenByUserId } from '../../../queries/childQueries';
import { getNotificationData } from '../../../queries/notificationQueries';
import { Child, NotificationPaginatedList } from '../../../firebase/types';
import { MenuListItems } from './MenuListItems';
import { NotificationsPanel } from './NotificationsPanel';
import { useAuthorization } from '../../../hooks/useAuthorization';
import { onAuthStateChanged, getUserRole } from '../../../queries/authQueries';
import Logo from '../../../assets/MALWSP_logo_nav.png';
import { Button } from '../../../components/Button';

export const Navbar = () => {
    const classes = useStyles();
    const [avatarContent] = useState('P');
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isNotificationsPanelOpen, setNotificationsPanelOpen] = useState(false);
    const [userRole, setUserRole] = useState('');
    const currentUser = useAuthorization(true);

    const children = useSubscribed<Child[], User | null>(
        (callback: OnSnapshotCallback<Child[]>) => {
            if (currentUser) {
                getChildrenByUserId(currentUser.uid, callback);
            }
        },
        [],
        [currentUser],
    ) as Child[];
    const notificationResponse = useSubscribed<NotificationPaginatedList, User | null>(
        (callback: OnSnapshotCallback<NotificationPaginatedList>) => {
            if (currentUser) {
                getNotificationData(callback, currentUser.uid, 5);
            }
        },
        [],
        [currentUser],
    ) as NotificationPaginatedList;

    onAuthStateChanged(async (user: User | null) => {
        if (user) {
            const role = await getUserRole(user);
            if (role) {
                setUserRole(role);
            }
        }
    });

    const handleAvatarClick = () => {
        setMenuOpen(prevOpen => !prevOpen);
    };

    const handleNotificationsIconClick = () => {
        setNotificationsPanelOpen(isOpen => !isOpen);
    };

    const handleClose = () => {
        setMenuOpen(false);
    };

    return (
        <div>
            <div className={classes.menuContainer}>
                <Link to={`/${userRole}`} className={classes.homeLink}>
                    <img src={Logo} className={classes.logo} alt="Logo Mali Wspaniali" />
                </Link>
                <IconButton color="inherit" onClick={handleNotificationsIconClick}>
                    <Badge
                        badgeContent={
                            notificationResponse.notifications &&
                            notificationResponse.notifications.filter(el => !el.isRead).length
                        }
                        classes={{ badge: classes.badgeColor }}
                    >
                        <Notifications className={classes.notificationsIcon} />
                    </Badge>
                </IconButton>
                <Avatar className={classes.avatar}>
                    <Button className={classes.avatarButton} onClick={handleAvatarClick}>
                        {avatarContent}
                    </Button>
                </Avatar>
            </div>
            {isNotificationsPanelOpen && <NotificationsPanel notifications={notificationResponse.notifications} />}
            {isMenuOpen && <MenuListItems childrenData={children} userRole={userRole} handleClose={handleClose} />}
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            width: '40px',
            height: '40px',
            marginRight: '50px',
            marginLeft: '20px',
            backgroundColor: secondaryColor,

            [theme.breakpoints.down('sm')]: {
                backgroundColor: white,
                marginRight: '10px',
                marginLeft: '10px',
            },
        },
        avatarButton: {
            color: 'white',

            [theme.breakpoints.down('sm')]: {
                color: textColor,
                fontSize: '14px',
                fontWeight: 'bold',
            },
        },
        notificationsIcon: {
            width: '19px',
            height: '19px',
            color: secondaryColor,

            [theme.breakpoints.down('sm')]: {
                color: white,
                marginLeft: 'auto',
            },
        },
        badgeColor: {
            backgroundColor: theme.palette.primary.main,
            color: white,
            [theme.breakpoints.down('sm')]: {
                backgroundColor: secondaryColor,
            },
        },
        menuContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '30px',
            zIndex: 10,
            borderRadius: '0 0 8px 8px',

            [theme.breakpoints.down('sm')]: {
                backgroundColor: theme.palette.primary.main,
                width: '100vw',
                height: '60px',
                marginTop: 0,
                alignItems: 'center',
                position: 'fixed',
                top: 0,
                borderRadius: '0',
            },
        },
        logo: {
            display: 'none',

            [theme.breakpoints.down('sm')]: {
                display: 'block',
                width: '54px',
                height: '44px',
            },
        },
        homeLink: {
            [theme.breakpoints.down('sm')]: {
                marginRight: 'auto',
                marginLeft: '10px',
            },
        },
    }),
);
