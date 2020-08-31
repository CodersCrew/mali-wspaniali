import React from 'react';
import { Drawer, makeStyles, Theme, createStyles } from '@material-ui/core';

import { getMenuWidth } from './getMenuWidth';
import { Device } from '../../../queries/useBreakpoints';

interface Props {
    onClose: () => void;
    device: Device;
    open: boolean;
    children: JSX.Element;
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
        },
    }),
);
