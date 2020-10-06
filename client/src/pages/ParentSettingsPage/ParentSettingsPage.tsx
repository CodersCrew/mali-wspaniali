import React, { useEffect } from 'react';
import { createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { activePage } from '../../apollo_client';
import { ParentSettingsExpansionPanel } from './ParentSettingsExpansionPanel';
import { Theme } from '../../theme';
import { useMe } from '../../utils/useMe';

export function ParentSettingsPage() {
    const user = useMe();
    const classes = useStyles();

    useEffect(() => {
        activePage(['parent-menu.settings']);
    }, []);

    if (!user) return null;

    return (
        <div className={classes.container}>
            <ParentSettingsExpansionPanel user={user} />
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: theme.spacing(3),
        },
    }),
);
