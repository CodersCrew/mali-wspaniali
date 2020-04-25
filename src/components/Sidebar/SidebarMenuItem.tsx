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
    const {
        menuOpenedItem,
        menuClosedItem,
        menuClosedIcon,
        menuOpenedIcon,
        menuOpenedLabel,
        menuClosedLabel,
    } = classes;

    const menuItemStyle = openSidebar ? menuOpenedItem : menuClosedItem;
    const menuIconStyle = openSidebar ? menuOpenedIcon : menuClosedIcon;
    const menuLabelStyle = openSidebar ? menuOpenedLabel : menuClosedLabel;

    return (
        <MenuItem key={name} className={menuItemStyle}>
            <Link to={link}>
                <ListItem>
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

        '&:hover': {
            backgroundColor,
            borderRadius: '10px',
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
    },
    menuOpenedItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        cursor: 'pointer',
        padding: '8px 11px 8px 12px',
        marginBottom: 12,

        '&:hover': {
            backgroundColor,
            borderRadius: '4px',
            color: activeColor,
        },
    },
    menuClosedIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    menuOpenedIcon: {
        marginRight: '22px',
        cursor: 'pointer',
        display: 'flex',
        width: '24px',
        height: '24px',
    },
});
