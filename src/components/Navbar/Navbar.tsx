import React, { useState } from 'react';
import { Avatar, IconButton, makeStyles, Button } from '@material-ui/core/';
import { Notifications } from '@material-ui/icons/';
import { secondaryColor } from '../../colors';
import { useSubscribed } from '../../hooks/useSubscribed';
import { OnSnapshotCallback } from '../../firebase/userRepository';
import { getChildrenByUserId } from '../../queries/childQueries';
import { getCurrentUser } from '../../queries/userQueries';
import { Child } from '../../firebase/types';
import { MenuListItems } from './MenuListItems';

export const Navbar = () => {
    const classes = useStyles();
    const [avatarContent] = useState('P');
    const [isMenuOpen, setMenuOpen] = useState(false);

    const currentUser = getCurrentUser();
    const children = useSubscribed<Child[]>((callback: OnSnapshotCallback<Child[]>) => {
        if (currentUser) {
            getChildrenByUserId(currentUser.uid, callback);
        }
    }, []) as Child[];

    const handleAvatarClick = () => {
        setMenuOpen((prevOpen) => !prevOpen);
    };

    return (
        <div>
            <div className={classes.menuContainer}>
                <IconButton color="inherit">
                    <Notifications className={classes.notificationsIcon} />
                </IconButton>
                <Avatar className={classes.avatar} >
                    <Button className={classes.avatarButton} onClick={handleAvatarClick}>{avatarContent}</Button>
                </Avatar>
            </div>
            {isMenuOpen && <MenuListItems childrenData={children} />}
        </div>
    );
};

const useStyles = makeStyles({
    avatar: {
        width: '40px',
        height: '40px',
        marginRight: '50px',
        marginLeft: '20px',
        backgroundColor: secondaryColor,
    },
    avatarButton: {
        color: 'white',
    },
    notificationsIcon: {
        width: '19px',
        height: '19px',
        color: secondaryColor,
    },
    menuContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '30px'
    },
});