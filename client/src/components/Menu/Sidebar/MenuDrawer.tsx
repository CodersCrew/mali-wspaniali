import React from 'react';
import { Drawer, SwipeableDrawer, makeStyles, Theme, createStyles } from '@material-ui/core';

import { getMenuWidth } from './getMenuWidth';
import { Device } from '../../../queries/useBreakpoints';
import { useSidebarState } from '../../../utils/useSidebar';

interface Props {
    device: Device;
    children: React.ReactNode;
}

export function MenuDrawer({ device, children }: Props) {
    const [width] = getMenuWidth(device);
    const classes = useStyles({ width });
    const sidebarState = useSidebarState();

    if (!sidebarState) return null;

    if (device === 'DESKTOP') {
        return (
            <Drawer variant="permanent" anchor="left" classes={classes} open>
                {children}
            </Drawer>
        );
    }

    return (
        <SwipeableDrawer
            variant="temporary"
            anchor="left"
            classes={classes}
            open={sidebarState.isOpen}
            ModalProps={{
                keepMounted: true,
            }}
            disableSwipeToOpen={false}
            onClose={sidebarState.closeSidebar}
            onOpen={sidebarState.openSidebar}
        >
            {children}
        </SwipeableDrawer>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            paddingTop: theme.spacing(8),
            width: ({ width }: { width: number }) => width,
            zIndex: '900 !important' as any,
        },
        root: {
            zIndex: '900 !important' as any,
        },
    }),
);
