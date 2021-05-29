import { useState, useRef } from 'react';

import { IconButton, makeStyles, Theme, createStyles, Box, AppBar, Toolbar, Typography } from '@material-ui/core/';
import { Notifications, Menu as MenuIcon } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import { NotificationsPanel } from './NotificationsPanel';
import { Notification } from '../../../graphql/types';
import { Device } from '../../../queries/useBreakpoints';
import { LanguageSelector } from '../../LanguageSelector';
import { AppLogo } from '../../AppLogo';
import { useOnClickOutside } from '../../../utils/useOnClickOutside';
import { useReadNotification } from '../../../operations/mutations/Notification/readNotification';
import { useSidebarState } from '../../../utils/useSidebar';


interface Props {
    device: Device;
    language: string;
    notifications: Notification[];
    activePage: string[];
    onLanguageChange: (language: string) => void;
}

const isChildPage = (url: string) => {
    return url.includes('child');
};

export function Navbar({ device, language, notifications, activePage, onLanguageChange }: Props) {
    const [isNotificationPopupOpen, setIsNotificationPopupOpen] = useState(false);
    const { readNotification } = useReadNotification();
    const classes = useStyles();
    const popupRef = useRef<HTMLElement | null>(null);
    useOnClickOutside(popupRef, () => setIsNotificationPopupOpen(false));
    const { t } = useTranslation();
    const sidebarState = useSidebarState();
    const location = useLocation();


    function handleNotificationPopupClick() {
        setIsNotificationPopupOpen((prev) => !prev);
    }

    const containerMobileClass =  (isChildPage(location.pathname) ?
        `${classes.containerMobileBoxShadowNone} ${classes.containerMobile}` : classes.containerMobile);

    return (
        <Box zIndex="appBar">
            <AppBar
                position="fixed"
                classes={{
                    root: clsx({
                        [containerMobileClass]: device !== 'DESKTOP',
                    }),
                }}
            >
                <Toolbar classes={{ root: classes.container }}>
                    {device === 'DESKTOP' ? (
                        <span className={classes.logo}>
                            <AppLogo />
                        </span>
                    ) : (
                        <IconButton onClick={sidebarState.toggleSidebar}>
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
            borderBottom: `1px solid ${theme.palette.primary.main}`,
        },
        containerMobileBoxShadowNone: {
            [theme.breakpoints.down('sm')]: {
                boxShadow: 'none',
            }
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
