import React, { useEffect } from 'react';
import { createStyles, makeStyles, Paper, Theme } from '@material-ui/core';

import { activePage } from '../../apollo_client';
import { KeyCodes } from './KeyCodes/KeyCodes';

export function AdminCodesPage() {
    const classes = useStyles();

    useEffect(() => {
        activePage(['admin-menu.access.title', 'admin-menu.access.keycodes']);
    }, []);

    return (
        <div className={classes.container}>
            <Paper classes={{ root: classes.innerContainer }}>
                <KeyCodes />
            </Paper>
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(3),
        },
        innerContainer: {
            padding: theme.spacing(2),
        },
    }),
);
