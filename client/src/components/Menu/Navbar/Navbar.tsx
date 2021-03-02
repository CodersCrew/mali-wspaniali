import { useState, useRef } from 'react';

import { IconButton, makeStyles, Theme, createStyles, Box, AppBar, Toolbar, Typography } from '@material-ui/core/';
import { Notifications, Menu as MenuIcon } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { NotificationsPanel } from './NotificationsPanel';
import { Notification } from '../../../graphql/types';
import { Device } from '../../../queries/useBreakpoints';
import { LanguageSelector } from '../../LanguageSelector';
import { AppLogo } from '../../AppLogo';
import { useOnClickOutside } from '../../../utils/useOnClickOutside';
import { useReadNotification } from '../../../operations/mutations/Notification/readNotification';

interface Props {
    device: Device;
    language: string;
    notifications: Notification[];
    activePage: string[];
    onSidebarToggle: () => void;
    onLanguageChange: (language: string) => void;
}

export function Navbar({ device, language, notifications, activePage, onSidebarToggle, onLanguageChange }: Props) {
    const [isNotificationPopupOpen, setIsNotificationPopupOpen] = useState(false);
    const { readNotification } = useReadNotification();
    const classes = useStyles();
    const popupRef = useRef<HTMLElement | null>(null);
    useOnClickOutside(popupRef, () => setIsNotificationPopupOpen(false));
    const { t } = useTranslation();

    function handleNotificationPopupClick() {
        setIsNotificationPopupOpen((prev) => !prev);
    }

    return (
        <Box zIndex="appBar">
            <AppBar
                position="fixed"
                classes={{
                    root: clsx({
                        [classes.containerMobile]: device !== 'DESKTOP',
                    }),
                }}
            >
                <Toolbar classes={{ root: classes.container }}>
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
                        <Typography variant="h6" noWrap color="textPrimary">
                            {activePage.length > 0 && t(activePage[activePage.length - 1])}
                        </Typography>
                        <div className={classes.menuSide}>
                            <LanguageSelector language={language} onClick={onLanguageChange} />
                            <span ref={popupRef}>
                                <IconButton
                                    aria-label="notifications"
                                    onClick={handleNotificationPopupClick}
                                    color={notifications.find((n) => !n.isRead) ? 'secondary' : 'default'}
                                >
                                    <Notifications />
                                </IconButton>
                                {isNotificationPopupOpen && (
                                    <NotificationsPanel
                                        onClick={(id) => readNotification(id)}
                                        notifications={notifications}
                                    />
                                )}
                            </span>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            minHeight: theme.spacing(8),
        },
        containerMobile: {
            boxShadow: 'none',
            borderBottom: `1px solid ${theme.palette.primary.main}`,
        },
        toolbar: theme.mixins.toolbar,
        logo: {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(33),
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
