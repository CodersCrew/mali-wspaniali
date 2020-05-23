import React, { ReactElement } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MenuItem, ListItemIcon, ListItem, ListItemText, makeStyles } from '@material-ui/core/';
import { PowerSettingsNew } from '@material-ui/icons/';
import { useTranslation } from 'react-i18next';
import { handleSignOut } from '../../queries/authQueries';

type menuListItemProps = {
    link: string;
    text: string;
    iconComponent: ReactElement;
};

export const MenuListItem = ({ link, text, iconComponent }: menuListItemProps) => {
    const classes = useStyles();

    return (
        <MenuItem key={text} component="div">
            <Link to={link} className={classes.menuLink}>
                <ListItem className={classes.listItem}>
                    <ListItemIcon>{iconComponent}</ListItemIcon>
                    <ListItemText className={classes.listItemText}>{text}</ListItemText>
                </ListItem>
            </Link>
        </MenuItem>
    );
};

export const MenuLogoutItem = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const history = useHistory();

    const handleLogoutClick = () => {
        handleSignOut();
        history.push('/login');
    };

    return (
        <MenuItem key="Logout" onClick={handleLogoutClick} component="div">
            <ListItem className={classes.listItem}>
                <ListItemIcon className={classes.listItemIcon}>
                    <PowerSettingsNew />
                </ListItemIcon>
                <ListItemText className={classes.listItemText}>{t('navbar.logout')}</ListItemText>
            </ListItem>
        </MenuItem>
    );
};

const useStyles = makeStyles({
    menuLink: {
        textDecoration: 'none',
        color: 'inherit',
    },
    listItem: {
        padding: '0px',
    },
    listItemIcon: {
        fontSize: '14px',
    },
    listItemText: {
        fontSize: '14px',
        fontWeight: 600,
        textTransform: 'uppercase'
    },
});
