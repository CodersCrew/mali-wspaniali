import React from 'react';
import { Hidden, Drawer, makeStyles, Theme, createStyles } from '@material-ui/core';

const drawerWidth = 354;

interface Props {
    onClose: () => void;
    open: boolean;
    children: JSX.Element;
}

export function MenuDrawer({ onClose, children, open }: Props) {
    const classes = useStyles();

    return (
        <>
            <Hidden xsDown implementation="css">
                <Drawer
                    variant="permanent"
                    anchor="left"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    open
                >
                    {children}
                </Drawer>
            </Hidden>
            <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor="left"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    open={open}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    onClose={onClose}
                >
                    {children}
                </Drawer>
            </Hidden>
        </>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawerPaper: {
            paddingTop: theme.spacing(8),
            width: drawerWidth,
        },
    }),
);
