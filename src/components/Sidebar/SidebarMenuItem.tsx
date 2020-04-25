import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { MenuItem, ListItemIcon, ListItem, ListItemText, makeStyles } from '@material-ui/core/';
import { backgroundColor, activeColor } from '../../colors';

type SidebarMenuItem = {
    name: string;
    link: string;
    icon: ReactElement;
    openSidebar: boolean;
};

export const SidebarMenuItem = ({ name, link, icon, openSidebar }: SidebarMenuItem) => {
    const classes = useStyles();

    const menuItemStyle = openSidebar ? classes.menuOpenedItem : classes.menuClosedItem;
    const menuIconStyle = openSidebar ? classes.menuOpenedIcon : classes.menuClosedIcon;
    const menuLabelStyle = openSidebar ? classes.menuOpenedLabel : classes.menuClosedLabel;

    return (
        <MenuItem key={name} className={menuItemStyle}>
            <Link to={link} className={classes.menuLinkItem}>
                <ListItem className={classes.menuItemWrapper}>
                    <ListItemIcon className={menuIconStyle}>{icon}</ListItemIcon>
                    <ListItemText className={menuLabelStyle}>{name}</ListItemText>
                </ListItem>
            </Link>
        </MenuItem>
    );
};

const useStyles = makeStyles({
    menuClosedItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        height: 40,
        marginBottom: 12,
        borderRadius: '10px',

        '&:hover': {
            backgroundColor,
            borderRadius: '10px',
            color: activeColor,
        },
    },
    menuOpenedItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        cursor: 'pointer',
        padding: '8px 11px 8px 24px',
        marginBottom: 12,
        overflow: 'inherit',

        '&:hover': {
            backgroundColor,
            borderRadius: '4px',
            color: activeColor,
        },
    },
    menuClosedLabel: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        opacity: 0,
        width: 0,
        transition: 'all 0.1s',
    },
    menuOpenedLabel: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        opacity: 1,
        width: 'auto',
        transition: 'all 0.1s',

        '& span': {
            fontWeight: 'bold',
        },
    },
    menuItemWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '24px',
        height: '24px',

        '&:hover': {
            color: activeColor,
        },
    },
    menuClosedIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: '#FFFFFF',
        width: 44,
        height: 44,

        '&:hover': {
            color: activeColor,
        },
    },
    menuOpenedIcon: {
        cursor: 'pointer',
        display: 'flex',
        color: '#FFFFFF',
    },
    menuLinkItem: {
        textDecoration: 'none',
        color: '#FFFFFF',
    },
});
