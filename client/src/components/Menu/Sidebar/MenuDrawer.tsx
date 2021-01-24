import React from 'react';
import { Drawer, makeStyles, Theme, createStyles } from '@material-ui/core';

import { Device } from '../../../queries/useBreakpoints';

import { getMenuWidth } from './getMenuWidth';

interface Props {
    onClose: () => void;
    device: Device;
    open: boolean;
    children: React.ReactNode;
}

export function MenuDrawer({ device, onClose, children, open }: Props) {
    const [width] = getMenuWidth(device);
    const classes = useStyles({ width });

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
        <Drawer
            variant="temporary"
            anchor="left"
            classes={{
                root: classes.drawerRoot,
                paper: classes.paper,
            }}
            open={open}
            ModalProps={{
                keepMounted: true,
            }}
            onClose={onClose}
        >
            {children}
        </Drawer>
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
