import React, { useState } from 'react';
import { Avatar, IconButton, makeStyles, Button, Theme, createStyles } from '@material-ui/core/';
import { Notifications } from '@material-ui/icons/';
import { User } from '../../firebase/firebase';
import { secondaryColor, mainColor, white, textColor } from '../../colors';
import { useSubscribed } from '../../hooks/useSubscribed';
import { OnSnapshotCallback } from '../../firebase/userRepository';
import { getChildrenByUserId } from '../../queries/childQueries';
import { Child } from '../../firebase/types';
import { MenuListItems } from './MenuListItems';
import { useAuthorization } from '../../hooks/useAuthorization';
import Logo from '../../assets/MALWSP_logo_nav.png';

export const Navbar = () => {
    const classes = useStyles();
    const [avatarContent] = useState('P');
    const [isMenuOpen, setMenuOpen] = useState(false);
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

    const handleAvatarClick = () => {
        setMenuOpen(prevOpen => !prevOpen);
    };

    return (
        <div>
            <div className={classes.menuContainer}>
                <img src={Logo} className={classes.logo} alt='Logo Mali Wspaniali'/>
                <IconButton color="inherit">
                    <Notifications className={classes.notificationsIcon} />
                </IconButton>
                <Avatar className={classes.avatar}>
                    <Button className={classes.avatarButton} onClick={handleAvatarClick}>
                        {avatarContent}
                    </Button>
                </Avatar>
            </div>
            { isMenuOpen && <MenuListItems childrenData={ children } /> }
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
                marginLeft: '10px'
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
                marginLeft: 'auto'
            },
        },
        menuContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '30px',
            zIndex: 10,
            borderRadius: '0 0 8px 8px',

            [theme.breakpoints.down('sm')]: {
                backgroundColor: mainColor,
                width: '100vw',
                height: '60px',
                marginTop: 0,
                alignItems: 'center',
                position: 'fixed',
                top: 0,
                borderRadius: '0 0 0 0',
            },
        },
        logo: {
            display: 'none',

            [theme.breakpoints.down('sm')]: {
                display: 'block',
                width: '54px',
                height: '44px',
                marginRight: 'auto',
                marginLeft: '10px'
            },
        },
    }),
);
