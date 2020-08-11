import React, { useState } from 'react';
import { Avatar, IconButton, makeStyles, Theme, createStyles, Badge } from '@material-ui/core/';
import { Notifications } from '@material-ui/icons/';
import { Link } from 'react-router-dom';
import { secondaryColor, white } from '../../../colors';
import { MenuListItems } from './MenuListItems';
import { NotificationsPanel } from './NotificationsPanel';
import Logo from '../../../assets/MALWSP_logo_nav.png';
import { ButtonSecondary } from '../../../components/Button';
import { Me } from '../../../graphql/types';

interface Props {
    user: Me | null;
}

export const Navbar = ({ user }: Props) => {
    const classes = useStyles();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isNotificationsPanelOpen, setNotificationsPanelOpen] = useState(false);

    const handleAvatarClick = () => {
        setMenuOpen(prevOpen => !prevOpen);
    };

    const handleNotificationsIconClick = () => {
        setNotificationsPanelOpen(isOpen => !isOpen);
    };

    const handleClose = () => {
        setMenuOpen(false);
    };

    if (!user) return null;

    const { children, role, notifications } = user;

    return (
        <div>
            <div className={classes.menuContainer}>
                <Link to={`/${user.role}`} className={classes.homeLink}>
                    <img src={Logo} className={classes.logo} alt="Logo Mali Wspaniali" />
                </Link>
                <IconButton color="inherit" onClick={handleNotificationsIconClick}>
                    <Badge
                        badgeContent={notifications.filter(n => n.isRead).length}
                        classes={{ badge: classes.badgeColor }}
                    >
                        <Notifications className={classes.notificationsIcon} />
                    </Badge>
                </IconButton>
                <Avatar className={classes.avatar}>
                    <ButtonSecondary variant="contained" className={classes.avatarButton} onClick={handleAvatarClick}>
                        P
                    </ButtonSecondary>
                </Avatar>
            </div>
            {isNotificationsPanelOpen && <NotificationsPanel notifications={notifications} />}
            {isMenuOpen && <MenuListItems children={children} role={role} handleClose={handleClose} />}
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
            height: 'inherit',

            [theme.breakpoints.down('sm')]: {
                color: theme.palette.common.black,
                backgroundColor: theme.palette.common.white,
                fontSize: '14px',
                fontWeight: 'bold',

                '&:hover': {
                    backgroundColor: theme.palette.common.white,
                },
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
