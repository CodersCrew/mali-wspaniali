import React, { useEffect } from 'react';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';

import { activePage } from '../../apollo_client';
import { TestHistoryList } from './TestHistoryList/TestHistoryList';

export function TestManagementPage() {
    const classes = useStyles();

    useEffect(() => {
        activePage(['admin-menu.test-management']);
    }, []);

    return (
        <Grid container>
            <Grid item sm={12}>
                <div className={classes.listContainer}>
                    <TestHistoryList />
                </div>
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        listContainer: {
            margin: `50px ${theme.spacing(3)}px 0`,
        },
    }),
);
