import React, { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuItem, ListItemIcon, ListItem, ListItemText, makeStyles } from '@material-ui/core/';
import clsx from 'clsx';
import { backgroundColor, secondaryColor, white } from '../../../colors';

type SidebarMenuItem = {
    name: string;
    link: string;
    icon: ReactElement;
    isSidebarOpen: boolean;
};
const getActiveClass = (pathUrl: string, link: string) => {
    const isParentCategoryBlog = link.includes('/parent/blog/category/') && pathUrl.includes('/parent/blog/category/');

    if (pathUrl === link || isParentCategoryBlog) return 'active';

    return null;
};
export const SidebarMenuItem = ({ name, link, icon, isSidebarOpen }: SidebarMenuItem) => {
    const classes = useStyles();
    const location = useLocation().pathname;

    return (
        <Link className={classes.link} to={link}>
            <MenuItem
                key={name}
                className={clsx(classes.menuItem, isSidebarOpen ? 'opened' : null, getActiveClass(location, link))}
            >
                <ListItem className={clsx(classes.menuItemWrapper, getActiveClass(location, link))}>
                    <ListItemIcon className={clsx(classes.menuItemIcon, 'closed', getActiveClass(location, link))}>
                        {icon}
                    </ListItemIcon>
                    <ListItemText className={classes.menuItemLabel}>{name}</ListItemText>
                </ListItem>
            </MenuItem>
        </Link>
    );
};

const useStyles = makeStyles({
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        height: 40,
        marginBottom: 12,
        cursor: 'pointer',
        borderRadius: '10px',
        '&:hover': {
            backgroundColor,
            color: secondaryColor,
        },
        '&.active': {
            color: secondaryColor,
            backgroundColor,
        },
        '&.opened': {
            justifyContent: 'flex-start',
            padding: '8px 11px 8px 10px',
            width: '210px',
            borderRadius: '4px',
            '& a': {
                textDecoration: 'none',
                color: white,
            },
            '&.active': {
                backgroundColor,
                color: secondaryColor,
            },
            '&:hover': {
                backgroundColor,
                color: secondaryColor,
                '& div': {
                    color: secondaryColor,
                },
            },
        },
    },
    menuItemLabel: {
        textTransform: 'uppercase',
        '& span': {
            fontWeight: 'bold',
            fontSize: 14,
            lineHeight: '17px',
            fontFamily: 'Montserrat',
            marginLeft: 5,
            textDecoration: 'none',
        },
    },
    menuItemWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '24px',
        height: '24px',
        '&:hover': {
            color: secondaryColor,
        },
        '&.active': {
            color: secondaryColor,
        },
    },
    menuItemIcon: {
        cursor: 'pointer',
        display: 'flex',
        color: white,
        marginRight: 12,
        '&.active': {
            color: secondaryColor,
        },
        '&.closed': {
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 0,
            width: 44,
            height: 44,

            '&:hover': {
                color: secondaryColor,
            },
        },
    },
    link: {
        textDecoration: 'none',
        color: white,
    },
});
