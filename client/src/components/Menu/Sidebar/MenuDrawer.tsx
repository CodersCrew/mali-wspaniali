import React, { useState, useEffect } from 'react';
import { Drawer, SwipeableDrawer, makeStyles, Theme, createStyles } from '@material-ui/core';

import { getMenuWidth } from './getMenuWidth';
import { Device } from '../../../queries/useBreakpoints';

interface Props {
    onClose: () => void;
    device: Device;
    open: boolean;
    children: React.ReactNode;
}

export function MenuDrawer({ device, onClose, children, open }: Props) {
    const [width] = getMenuWidth(device);
    const classes = useStyles({ width });
    const [state, setState] = useState(false);

    useEffect(() => {
        setState(open);
    }, [open]);

    const toggleDrawer = (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setState(isOpen);
        setTimeout(() => {
            onClose();
        }, 0);
    };

    if (device === 'DESKTOP') {
        return (
            <Drawer
                variant="permanent"
                anchor="left"
                classes={{
                    root: classes.drawerRoot,
                    paper: classes.paper,
                }}
                open
            >
                {children}
            </Drawer>
        );
    }

    return (
        <SwipeableDrawer
            variant="temporary"
            anchor="left"
            classes={{
                root: classes.drawerRoot,
                paper: classes.paper,
            }}
            open={state}
            ModalProps={{
                keepMounted: true,
            }}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
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
        drawerRoot: {
            zIndex: '900 !important' as any,
        },
    }),
);
