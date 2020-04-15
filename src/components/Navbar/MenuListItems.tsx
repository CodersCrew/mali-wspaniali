import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, MenuList, MenuItem, ListItemIcon, Paper, ListItem, ListItemText, makeStyles } from '@material-ui/core/';
import { FormatListBulleted, QuestionAnswer, Build, PowerSettingsNew } from '@material-ui/icons/';
import { useTranslation } from 'react-i18next';
import { firebase } from '../../firebase/firebase';
import { MenuListItemsProps, ChildMenuItem, StaticMenuItem } from './types';

export const MenuListItems = (props: MenuListItemsProps) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { childrenData } = props;

    const childMenuItems: ChildMenuItem[] = childrenData.map(child => {
        return (
            {
                name: child.firstName,
                link: `/child/:${child.id}`,
                avatar: child.avatar
            }
        );
    });

    const staticMenuItems: StaticMenuItem[] = [
        { name: t('navbar.news'), link: '/blog', icon: <FormatListBulleted /> },
        { name: t('navbar.messages'), link: '/', icon: <QuestionAnswer /> },
        { name: t('navbar.settings'), link: '/', icon: <Build /> },
    ];

    const handleLogoutClick = () => {
        firebase.auth.handleSignOut();
    };

    return (
        <Paper className={classes.menuList}>
            <MenuList >
                {childMenuItems.map(childItem => {
                    return (
                        <MenuItem key={childItem.name} component="div">
                            <Link to={childItem.link} className={classes.menuLink}>
                                <ListItem className={classes.listItem}>
                                    <ListItemIcon >
                                        <Avatar className={classes.listItemAvatar} src={childItem.avatar}></Avatar>
                                    </ListItemIcon>
                                    <ListItemText className={classes.listItemText}>{childItem.name}</ListItemText>
                                </ListItem>
                            </Link>
                        </MenuItem>
                    );
                })}
                {staticMenuItems.map(staticItem => {
                    return (
                        <MenuItem key={staticItem.name} component="div">
                            <Link to={staticItem.link} className={classes.menuLink}>
                                <ListItem className={classes.listItem}>
                                    <ListItemIcon className={classes.listItemIcon}>
                                        {staticItem.icon}
                                    </ListItemIcon>
                                    <ListItemText className={classes.listItemText}>{staticItem.name}</ListItemText>
                                </ListItem>
                            </Link>
                        </MenuItem>
                    );
                })}
                <MenuItem key='Logout' onClick={handleLogoutClick} component="div">
                    <ListItem className={classes.listItem}>
                        <ListItemIcon className={classes.listItemIcon}>
                            <PowerSettingsNew />
                        </ListItemIcon>
                        <ListItemText className={classes.listItemText}>{t('navbar.logout')}</ListItemText>
                    </ListItem>
                </MenuItem>
            </MenuList>
        </Paper>
    );
};

const useStyles = makeStyles({
    menuList: {
        position: 'absolute',
        zIndex: 10,
        marginLeft: 'calc(100vw - 210px)',
        marginTop: '10px',
    },
    menuLink: {
        textDecoration: 'none',
        color: 'inherit'
    },
    listItem: {
        padding: '0px'
    },
    listItemAvatar: {
        width: '24px',
        height: '24px'
    },
    listItemIcon: {
        fontSize: '14px'
    },
    listItemText: {
        fontSize: '14px'
    }
});