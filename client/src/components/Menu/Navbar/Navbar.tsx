import React, { useState } from 'react';
import { IconButton, makeStyles, Theme, createStyles } from '@material-ui/core/';
import { NotificationsPanel } from './NotificationsPanel';
import { Notification } from '../../../graphql/types';
import { Device } from '../../../queries/useBreakpoints';
import { Box, AppBar, Toolbar, Typography } from '@material-ui/core';
import { LanguageSelector } from '../../LanguageSelector';
import { Notifications, Menu as MenuIcon } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { AppLogo } from '../../AppLogo';

interface Props {
    device: Device;
    language: string;
    notifications: Notification[];
    activePage: string[];
    onSidebarToggle: () => void;
    onLanguageChange: (language: string) => void;
}

export function Navbar({
    device,
    language,
    notifications,
    activePage,
    onSidebarToggle,
    onLanguageChange,
}: Props) {
    const [isNotificationPopupOpen, setIsNotificationPopupOpen] = useState(
        false,
    );
    const classes = useStyles();
    const { t } = useTranslation();

    function handleNotificationPopupClick() {
        setIsNotificationPopupOpen((prev) => !prev);
    }

    return (
        <Box zIndex="appBar">
            <AppBar position="fixed">
                <Toolbar>
                    {device === 'DESKTOP' ? (
                        <span className={classes.logo}>
                            <AppLogo />
                        </span>
                    ) : (
                        <IconButton onClick={onSidebarToggle}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    <div className={classes.menuRoot}>
                        <Typography variant="h6" noWrap>
                            {activePage.length > 0 && t(activePage[activePage.length - 1])}
                        </Typography>
                        <div className={classes.menuSide}>
                            <LanguageSelector language={language} onClick={onLanguageChange} />
                            <IconButton aria-label="notifications" onClick={handleNotificationPopupClick}>
                                <Notifications />
                            </IconButton>
                            {isNotificationPopupOpen && <NotificationsPanel notifications={notifications} />}
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: theme.mixins.toolbar,
        logo: {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(16),
        },
        menuRoot: {
            display: 'flex',
            justifyContent: 'space-between',
            flex: 1,
            alignItems: 'center',
        },
        menuSide: {
            display: 'flex',
            alignItems: 'center',
        },
    }),
);
