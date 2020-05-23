import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { MenuItem, ListItemIcon, ListItem, ListItemText, makeStyles } from '@material-ui/core/';
import clsx from 'clsx';
import { backgroundColor, secondaryColor, white } from '../../colors';

type SidebarMenuItem = {
    name: string;
    link: string;
    icon: ReactElement;
    isSidebarOpen: boolean;
};

export const SidebarMenuItem = ({ name, link, icon, isSidebarOpen }: SidebarMenuItem) => {
    const classes = useStyles();

    return (
        <MenuItem key={name} className={clsx(classes.menuItem, isSidebarOpen ? 'opened' : null)}>
            <Link to={link}>
                <ListItem className={classes.menuItemWrapper}>
                    <ListItemIcon className={clsx(classes.menuItemIcon, 'closed')}>{icon}</ListItemIcon>
                    <ListItemText className={classes.menuItemLabel}>{name}</ListItemText>
                </ListItem>
            </Link>
        </MenuItem>
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

        '&.opened': {
            justifyContent: 'flex-start',
            padding: '8px 11px 8px 10px',
            width: '200px',
            borderRadius: '4px',

            '& a': {
                textDecoration: 'none',
                color: white,
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
    },
    menuItemIcon: {
        cursor: 'pointer',
        display: 'flex',
        color: white,
        marginRight: 12,

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
});
